# NeuralPaths Radar

A full-stack web application built with React and Node.js, featuring a modern UI and comprehensive functionality.

## Project Structure

```
neuralpaths-radar/
├── src/                    # Frontend source code
│   ├── api/               # API integration and services
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── components/        # Reusable React components
│   ├── config/            # Configuration files
│   ├── context/           # React context providers
│   ├── db/                # Database related utilities
│   ├── layouts/           # Page layout components
│   ├── pages/             # Page components
│   ├── services/          # Business logic and services
│   └── utils/             # Utility functions
├── backend/               # Backend server code
├── public/                # Public static files
├── build/                 # Production build output
├── supabase/              # Supabase configuration and migrations
└── patches/               # Patch files for dependencies
```

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- Chart.js for data visualization
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- Supabase for database
- Anthropic AI SDK integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=your_api_url
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This will start both the frontend (port 3000) and backend (port 3001) servers concurrently.

## Available Scripts

- `npm start` - Starts both frontend and backend servers
- `npm run start:frontend` - Starts only the frontend server
- `npm run start:backend` - Starts only the backend server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## Features

- Modern, responsive UI with Material-UI components
- Real-time data visualization with Chart.js
- PDF generation capabilities
- Progressive Web App (PWA) support
- Authentication and authorization
- API integration with Anthropic AI
- Database integration with Supabase

## Development Guidelines

1. Follow the component structure in `src/components/`
2. Use the established layout patterns in `src/layouts/`
3. Place new pages in `src/pages/`
4. Add new API integrations in `src/api/`
5. Use the context providers in `src/context/` for state management

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

Private - All rights reserved 