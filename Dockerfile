# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:12.19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3000
