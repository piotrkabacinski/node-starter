FROM node:24-alpine

WORKDIR /usr/src/app

RUN npm install --global corepack@latest \
  && corepack enable pnpm \
  && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY package*.json ./
