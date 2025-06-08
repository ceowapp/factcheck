# FactCheck Video Analyzer

A comprehensive video fact-checking platform that helps users analyze and verify claims in videos across various social media platforms.

## Features

- Video analysis and transcription
- AI-powered fact-checking
- Cross-platform support (YouTube, TikTok, Instagram)
- User authentication and subscription management
- Mobile app with offline capabilities

## Project Structure

```
factcheck-video-analyzer/
├── app/             # React Native (Expo) app
├── backend/         # Backend services
├── shared/          # Shared types and utilities
└── docs/           # Documentation
```

## Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI
- Firebase CLI
- Google Cloud SDK

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/factcheck-video-analyzer.git
   cd factcheck-video-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each directory (app, backend)
   - Fill in the required environment variables

4. Start development servers:
   ```bash
   npm run dev
   ```

## Development

- Mobile app: `npm run dev:app`
- Backend: `npm run dev:backend`
- Tests: `npm run test`

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy backend:
   ```bash
   npm run deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 