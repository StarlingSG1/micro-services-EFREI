FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY categories-service.js categories-service.js
CMD npm start