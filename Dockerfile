FROM node:22.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
