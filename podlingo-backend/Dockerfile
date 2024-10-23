FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Use build argument for environment variable
ARG PODCAST_INDEX_API_KEY
ENV PODCAST_INDEX_API_KEY=$PODCAST_INDEX_API_KEY
ARG PODCAST_INDEX_API_SECRET
ENV PODCAST_INDEX_API_SECRET=$PODCAST_INDEX_API_SECRET

ARG CLIENT_URL
ENV CLIENT_URL=$CLIENT_URL

#  hot reloading
RUN npm install -g nodemon

EXPOSE 5000

CMD ["npm", "run", "dev"]