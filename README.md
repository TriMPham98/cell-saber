# Pocket-Saber

An interactive web-based lightsaber experience powered by Three.js and WebRTC. Transform your device into a virtual lightsaber with real-time 3D graphics and motion controls.

## Features

- Real-time 3D graphics with Three.js
- WebRTC integration for multiplayer capabilities
- Mobile device support with accelerometer controls
- Desktop support with mouse controls
- QR code integration for easy mobile access
- Sound effects and visual feedback
- Calibration system for accurate motion tracking
- Debug mode for development
- Responsive design that adapts to different screen sizes

## Prerequisites

- Modern web browser with WebGL support
- Node.js and npm (for development)
- Mobile device with accelerometer (for mobile experience)
- Webcam and microphone permissions (for multiplayer features)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pocket-saber.git
cd pocket-saber
```

2. Install dependencies:
```bash
npm install
```

## Dependencies

- Three.js - 3D graphics engine
- GSAP (GreenSock Animation Platform) - Animation library
- WebRTC - Real-time communication
- Other dependencies:
  - MotionPathPlugin (GSAP plugin)
  - Debug utilities
  - Resource management system
  - Sound system

## Usage

### Desktop Mode
1. Open the application in a web browser
2. Click the play button to start
3. Use mouse movement to control the lightsaber
4. Enable debug mode by adding '#debug' to the URL

### Mobile Mode
1. Scan the QR code displayed on the desktop version
2. Grant necessary permissions (accelerometer, camera if needed)
3. Follow the calibration process
4. Use your device's motion to control the lightsaber

## Development

### Debug Mode
Enable debug mode by adding '#debug' to the URL. This provides:
- Performance statistics
- Debug panel
- Real-time parameter adjustments
- Scene inspection tools

### Key Classes

#### Experience.js
The main application class that:
- Manages the application lifecycle
- Handles resource loading
- Sets up the 3D scene
- Manages input and events
- Coordinates between different modules

#### Configuration
The application automatically handles:
- Pixel ratio optimization
- Responsive sizing
- Mobile device detection
- Touch input handling
- Double-tap zoom prevention

## Performance Optimization

- Automatic pixel ratio management (capped between 1 and 2)
- Resource disposal system for memory management
- Mobile-specific optimizations
- Efficient render loop

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Add your license information here]

## Acknowledgments

- Three.js community
- GSAP team
- WebRTC contributors