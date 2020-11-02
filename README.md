# Hello, Node.js!

## Docker

```Bash
cp .env.template .env
docker-compose build
docker-compose up # http://localhost:3000

# Start container sesssion
docker exec -it <container name> bash
```

## DB

Inside DB container:

```Bash
psql -U postgres

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
