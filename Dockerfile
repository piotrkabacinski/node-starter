# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
