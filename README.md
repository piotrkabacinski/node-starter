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
# Create .env file based on template file:
cp .env.template .env

npm i

docker-compose build
docker-compose up # or npm run dev
```

When installing new dependencies, don't forget to install them within docker-container:

```
docker-compose run --rm app npm i
```

## Tests

```
docker-compose run --rm app npm t
```

## Postgres

```Bash
docker exec -it <container name prefix>_db_1 psql -U postgres

\l # List all data bases
\c <db name> # Connect to DB
\dt # Show data base tables
```

## Migrations

1. Set `synchronize: false` in `ormconfig.js`.
2. Make change in schema (for example update property name in some entity).
3. [Create migration file](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations): `npm run migration:generate` - typeorm will compare current schema with entities and add required queries to migration file (`src/db/migration/<timestamp>-PostRefactoring`).
4. Run migrations to apply your change to the database: `npm run migration:run`.

## Redis

```Bash
docker exec -it <container name prefix>_redis_1 redis-cli
```

## Insomnia

For manual tests of Todo API example you can import [Insomnia](https://insomnia.rest/) workspace from `insomnia.json`.

## Deployment

App is configured for [Heroku](https://www.heroku.com/) environment. See [Heroku.md](Heroku.md) file for deployment details.
