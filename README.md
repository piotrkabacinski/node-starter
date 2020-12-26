# Hello, Node.js!

## Docker

```Bash
# Create .env file base on template file:
cp .env.template .env

npm i

docker-compose build
docker-compose up # or npm start
```

When installing new dependencies, don't forget to install them within docker-container as well:

```
npm run docker:install
```

## Tests

```
npm t
```

## Postgres

```Bash
docker exec -it hello-node_db_1 sh

psql -U <user name>

\l # list of all DB
\c hello # connect to "hello" DB
\dt # Show data bases tables
```

### Migrations

1. Set `synchronize: false` in `ormconfig.js`.
2. Make change in schema (for example update property name in some entity).
3. Inside app container: [Create migration file](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations): `sh typeorm.sh migration:generate -n PostRefactoring` - typeorm will compare current schema with entities and add required queries to migration file (`src/db/migration/<timestamp>-PostRefactoring`).
4. Run migrations to apply your change to the database: `sh typeorm.sh migration:run`.

## Redis

```Bash
docker exec -it hello-node_redis_1 redis-cli
```

## TODOs

- [x] TypeScript
- [x] Docker
- [x] Postgres DB
- [x] TypeOrm
- [x] OpenAPI
- [x] Tests
- [x] Migrations
- [x] Redis
- [ ] 'Todo app' example
- [ ] App Deployment
