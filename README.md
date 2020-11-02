# Hello, Node.js!

## Docker

```Bash
docker-compose build
docker-compose up # http://localhost:3000

# Start container sesssion
docker exec -it <container name> bash
```

## DB

Inside db container:

```Bash
psql -U postgres

\l # list of all DB
\c hello # connect to "hello" DB
\dt # Show databes tables
```

```SQL
-- After connecting to "hello" DB:

CREATE TABLE todo(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

INSERT INTO todo (description) VALUES ('Hello, World!');

SELECT * FROM todo;
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
