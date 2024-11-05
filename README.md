# Podlingo

Podlingo is a language learning platform that helps users discover podcasts tailored to their language learning journey. It uses the [Podcast Index API](https://podcastindex.org) to provide a curated selection of podcasts based on language and proficiency level.

## Features

- User authentication and profile management
- Podcast discovery with language and level filtering
- Language proficiency tracking (A1-C2 levels)
- Comprehensive Security features
- Responsive design
- Docker support for both development and production

## Tech Stack

### Frontend
- React 18
- Material-UI
- React Router DOM
- Axios

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Helmet for security headers
- Rate limiting and compression
- Podcast Index API integration

## Getting Started

1. Clone the repository
2. Set up environment variables:

    Frontend (.env):
    ```bash
    REACT_APP_API_URL=http://localhost:5000
    ```

    Backend (.env):
    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PODCAST_INDEX_API_KEY=your_api_key
    PODCAST_INDEX_API_SECRET=your_api_secret
    CLIENT_URL=http://localhost:3000
    NODE_ENV=development    # or production
    DOMAIN=your_domain     # required in production
    ```

3. Start the services:

    #### With Docker Compose:

    Development:
    ```bash
    docker-compose up
    ```

    Production:
    ```bash
    docker-compose -f docker-compose.prod.yml up
    ```

    #### Running Locally:

    ```bash
    # Backend
    cd podlingo-backend && npm install && npm run dev

    # Frontend
    cd podlingo-frontend && npm install && npm run dev
    ```

## Documentation

- [Frontend Documentation](./podlingo-frontend/README.md)
- [Backend Documentation](./podlingo-backend/README.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
