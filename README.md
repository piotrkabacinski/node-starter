# Hello, Node.js!

Dockerized Node.js project starter using following stack:

- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [OpenApi](https://www.openapis.org/)
- [Mocha](https://mochajs.org/)

## Docker

```Bash
# Create .env file base on template file:
cp .env.template .env

npm i

docker-compose build
docker-compose up # or npm start:dev
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
3. [Create migration file](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations): `npm run migration:generate` - typeorm will compare current schema with entities and add required queries to migration file (`src/db/migration/<timestamp>-PostRefactoring`).
4. Run migrations to apply your change to the database: `npm run migration:run`.

## Redis

```Bash
docker exec -it hello-node_redis_1 redis-cli
```

## Insomnia

For manual tests of Todo API example you can import [Insomnia](https://insomnia.rest/) workspace from `insomnia.json`.

## Deployment

App is configured for [Heroku](https://www.heroku.com/) environment. See [Heroku.md](Heroku.md) file for deployment details.
