# Hello, Node.js!

## Docker

```Bash
cp .env.template .env

npm i

docker-compose build
docker-compose up # http://localhost:4000

# To start shell session inside container:
docker ps
docker exec -it <container id> sh
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
- [ ] OpenAPI
- [ ] Tests
- [ ] Redis
- [ ] 'Todo app' example
- [ ] Heroku deployment
