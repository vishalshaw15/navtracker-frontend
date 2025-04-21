# Tracker Frontend

A modern, responsive frontend application built with React, TypeScript, and Chakra UI. This project follows best practices in frontend development and provides a robust foundation for building scalable web applications.

## 🚀 Features

- ⚡️ Built with Vite for fast development and optimized production builds
- 🎨 Styled with Chakra UI and Emotion for a beautiful, responsive design
- 📱 Mobile-first approach with responsive layouts
- 🔒 Type-safe development with TypeScript
- 🧪 Comprehensive testing setup with Vitest
- 📦 Modern package management with Yarn
- 🛠️ Code quality tools: ESLint, Prettier, Husky, and lint-staged
- 🔄 State management with Zustand
- 🔄 Data fetching with React Query
- 📝 Form handling with React Hook Form and Zod validation
- 🎯 Routing with React Router v7
- 🎨 Custom theme configuration
- 🚀 Error handling with React Error Boundary

## 📋 Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd tracker-FE
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your configuration.

## 🚀 Development

### Starting the Development Server

1. Ensure you have all prerequisites installed
2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Environment Configuration

The application requires the following environment variables to be set in your `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false

# Authentication
VITE_AUTH_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token

# App Configuration
VITE_APP_NAME=NavTracker
VITE_APP_VERSION=1.0.0
```

## 📱 Application Functionality

### Core Features

1. **Single Sign-On (SSO) Integration**

   - Seamless authentication through GHL (Go High Level) integration
   - Secure token management and user data handling
   - Automatic session management

2. **User Data Management**

   - Secure retrieval and decryption of user data
   - Integration with NavTrack Edge API for data processing
   - Error handling and logging for data operations

3. **Modern UI/UX**

   - Responsive design using Chakra UI components
   - Mobile-first approach for optimal viewing on all devices
   - Custom theme configuration for consistent branding

4. **Data Management**

   - Efficient data fetching with React Query
   - State management using Zustand
   - Form handling with React Hook Form and Zod validation

5. **Security Features**
   - Secure token storage and management
   - API request interception for authentication
   - Error boundary implementation for graceful error handling

### Technical Architecture

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand for global state
- **API Integration**: Axios with custom interceptors
- **Routing**: React Router v7 for navigation
- **Styling**: Chakra UI with Emotion for styling
- **Build Tool**: Vite for fast development and optimized builds

## 📦 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run tests
- `yarn test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── constants/      # Application constants
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── interceptors/   # Axios interceptors
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── theme.ts        # Chakra UI theme configuration
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Chakra UI, Emotion
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router v7
- **Testing**: Vitest
- **Build Tool**: Vite
- **Package Manager**: Yarn
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- And all other amazing open-source projects that made this possible
