import fs from 'fs';
import express from 'express';
import { createServer } from 'https';
import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const server = createServer({
    key: fs.readFileSync('C:\\OSPanel\\userdata\\config\\cert_files\\server.key', 'utf8'),
    cert: fs.readFileSync('C:\\OSPanel\\userdata\\config\\cert_files\\server.crt', 'utf8')
}, app);

const wss = new WebSocketServer({ server });

// Storing client connections
const sessions = {};

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'CREATE_SESSION':
                // Creating a new session with a unique handshakeId
                if (data.handshakeId) {
                    sessions[data.handshakeId] = { desktop: ws }; // Saving the WebSocket of the current client as the first participant in the session
                    ws.send(JSON.stringify({ type: 'SESSION_CREATED', handshakeId: data.handshakeId }));
                }
                break;
            case 'JOIN_SESSION':
                // Joining an existing session with handshakeId
                if (data.handshakeId && sessions[data.handshakeId]) {
                    sessions[data.handshakeId].mobile = ws; // Adding this WebSocket to the session
                    ws.send(JSON.stringify({ type: 'SESSION_JOINED', handshakeId: data.handshakeId }));

                    // Notifying the desktop
                    sessions[data.handshakeId].desktop.send(JSON.stringify({ type: 'SESSION_JOINED', handshakeId: data.handshakeId }));
                }
                break;

            case 'OFFER':
                // Receiving an offer from the initiator, saving the initiator's WebSocket, and forwarding the offer to the mobile client
                const session = sessions[data.handshakeId];
                if (session && session.mobile) {
                    //session.desktop = ws; // Saving the initiator's WebSocket
                    session.mobile.send(JSON.stringify({ type: 'OFFER', sdp: data.sdp })); // Forwarding the offer to the mobile client
                }
                break;

            case 'ANSWER':
                // Receiving an answer from the mobile client and forwarding it to the initiator
                const sessionForAnswer = sessions[data.handshakeId];
                if (sessionForAnswer && sessionForAnswer.desktop) {
                    sessionForAnswer.desktop.send(JSON.stringify({ type: 'ANSWER', sdp: data.sdp })); // Forwarding the answer to the initiator
                }
                break;

            case 'ICE_CANDIDATE':
                // Receiving an ICE candidate and forwarding it to the other party
                const sessionForCandidate = sessions[data.handshakeId];
                if (sessionForCandidate) {
                    // Determining where to send the ICE candidate
                    const targetWs = (sessionForCandidate.desktop === ws) ? sessionForCandidate.mobile : sessionForCandidate.desktop;

                    if (targetWs) {
                        targetWs.send(JSON.stringify({ type: 'ICE_CANDIDATE', candidate: data.candidate }));
                    }
                }
                break;
            default:
                console.warn(`Unsupported message type: ${data.type}`);
        }
    });

    ws.on('close', () => {
        // Finding and removing the session associated with the closed WebSocket
        for (const [handshakeId, session] of Object.entries(sessions)) {
            if (session.mobile === ws || session.desktop === ws) {
                console.log(`Client disconnected: ${handshakeId}`);
                delete sessions[handshakeId];
                break;
            }
        }
    });
});

const PORT = process.env.SOCKET_PORT || 3033;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         wss.clients.forEach(client => {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message.toString());
//             }
//         });
//     });
// });
//
// server.listen(process.env.SOCKET_PORT, process.env.SOCKET_HOST , () => {
//     console.log('WebSocket Secure server running');
// });
