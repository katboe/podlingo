# Podlingo Backend

A Node.js/Express backend service for the Podlingo language learning platform. This service manages podcast discovery, user authentication, and language learning preferences.

## Features

- User authentication with JWT
- Podcast search and filtering by language/level
- Language level classification system
- MongoDB integration for data persistence
- Docker support for development and production

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Docker for containerization
- Podcast Index API integration

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with:
    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PODCAST_INDEX_API_KEY=your_api_key
    PODCAST_INDEX_API_SECRET=your_api_secret
    CLIENT_URL=your_frontend_url
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

## Docker Development

To run the application using Docker:

```bash
docker build -f Dockerfile.dev -t podlingo-backend:dev .
docker run -p 5000:5000 podlingo-backend:dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `node scripts/populateLanguages.js` - Populate language database
- `node scripts/populateLanguageLevel.js` - Populate language levels

## API Routes

- `/api/auth` - Authentication routes (register, login, logout)
- `/api/podcasts` - Podcast search and filtering
- `/api/user` - User preference management
- `/api/languages` - Language and level information

## Project Structure

- `/config` - Configuration files
- `/models` - Mongoose models
- `/routes` - Express routes
- `/middleware` - Custom middleware
- `/utils` - Utility functions
- `/scripts` - Database population scripts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.