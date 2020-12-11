# Hello, Node.js!

## Docker

```Bash
cp .env.template .env

npm i

docker-compose build
docker-compose up # or npm start

# To start shell session inside container:
docker ps
docker exec -it <container id> sh
```

## Tests

```
npm t
```

## DB

Inside DB container:

```Bash
psql -U <user name>

\l # list of all DB
\c hello # connect to "hello" DB
\dt # Show data bases tables
```

## TODOs

- [x] TypeScript
- [x] Docker
- [x] Postgress DB
- [x] TypeOrm
- [x] OpenAPI
- [x] Tests
- [ ] 'Todo app' example
- [ ] Heroku deployment
