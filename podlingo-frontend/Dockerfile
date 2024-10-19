FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use build argument for environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Serve the build files using a web server (like Nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]