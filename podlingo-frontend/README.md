# Podlingo Frontend

A React-based frontend application for the Podlingo language learning platform. This application allows users to discover podcasts in different languages, manage their language learning preferences, and track their progress.

## Features

- User authentication (login/register)
- Podcast search with language and level filters
- User language preferences management
- Dark theme UI using Material-UI
- Responsive design

## Tech Stack

- React 18
- Material-UI
- React Router DOM
- Axios for API calls
- HTTP-only cookies for authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory with:
```bash
REACT_APP_API_URL=http://localhost:5000/api  # Your backend API URL
```
4. Start the development server:
```bash
npm run dev
```

## Docker Development

To run the application using Docker:

```bash
docker build -f Dockerfile.dev -t podlingo-frontend:dev .
docker run -p 3000:3000 podlingo-frontend:dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Project Structure

- `/src/components` - React components
- `/src/config` - Configuration files
- `/src/context` - Context providers
- `/src/hooks` - Custom React hooks
- `/src/services` - API service layers
- `/src/utils` - Utility functions and helpers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Development Notes

When running in development mode:

- Ensure your backend CORS settings allow requests from http://localhost:3000
- Cookie settings must be configured properly for authentication
- Backend should be running on http://localhost:5000

## Troubleshooting

Common issues:

- Authentication not persisting: Check that cookies are being set properly and CORS is configured correctly
- API connection issues: Verify REACT_APP_API_URL is set correctly in .env
- Login/Register not working: Ensure backend is running and accessible