# Backend Production Dockerfile
FROM node:16 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

# Use build argument for environment variables
ARG PODCAST_INDEX_API_KEY
ENV PODCAST_INDEX_API_KEY=$PODCAST_INDEX_API_KEY
ARG PODCAST_INDEX_API_SECRET
ENV PODCAST_INDEX_API_SECRET=$PODCAST_INDEX_API_SECRET

# Final Production Stage
FROM node:16 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 5000

CMD ["node", "server.js"]  # Replace with your actual start command for production
