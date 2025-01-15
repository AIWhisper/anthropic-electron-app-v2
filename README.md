# Anthropic Electron App

This repository contains an enhanced version of the Anthropic Linux application, modified to provide improved cross-platform compatibility and enhanced API interaction capabilities. The project builds upon the foundation established by the Anthropic team while introducing significant improvements to the API handling, configuration management, and development workflow.

## Key Enhancements

### API Integration Updates
- Implemented a robust proxy server setup for secure API communication
- Enhanced error handling and response management
- Added support for streaming responses
- Improved API key management and request formatting

### Configuration Improvements
- Centralized configuration management via `config.ts`
- Environment-aware settings for development and production
- Streamlined API endpoint configuration
- Enhanced security measures for API key handling

### Development Environment
- Advanced development tools integration
- Redux DevTools support for state management debugging
- Improved hot-reload capabilities
- Cross-platform compatibility enhancements

## Technical Stack

- **Electron**: Core framework for cross-platform desktop application
- **Express**: Backend proxy server for API communication
- **React**: Frontend user interface
- **TypeScript**: Type-safe development environment

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AIWhisper/anthropic-electron-app-v2.git
   cd anthropic-electron-app-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:
   ```bash
   npm run electron-dev
   ```

## Project Structure

```
anthropic-electron-app-v2/
├── src/
│   └── api/
│       ├── config.ts         # API configuration and endpoints
│       └── prompt.api.ts     # Enhanced API interaction layer
└── public/
    └── electron.js          # Main electron configuration and server setup
```

## Development Guidelines

### API Interaction
- All API calls are proxied through the local Express server
- Requests are automatically formatted according to Anthropic's specifications
- Streaming is enabled by default for optimal performance
- Comprehensive error handling is implemented at all levels

### Configuration Management
- Development settings are managed through environment variables
- Production configurations are properly secured
- API endpoints are centrally managed in `config.ts`

## Security Considerations

- Local proxy server implementation for secure API communication
- Environment-based configuration management
- Secure handling of API keys and sensitive data
- Cross-origin resource sharing (CORS) protection

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Package for distribution:
   ```bash
   npm run package
   ```

## Credits

This project is based on the original Linux application developed by the Anthropic team, with significant modifications and improvements contributed by the community. Special thanks to all contributors who have helped enhance and optimize the application.

## License

MIT

---

For more information about Anthropic and their API, visit [Anthropic's official documentation](https://docs.anthropic.com/).