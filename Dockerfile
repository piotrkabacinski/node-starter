# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:12.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.ts" ]
