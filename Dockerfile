FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --global corepack@latest

RUN corepack enable pnpm

RUN corepack use pnpm@latest
