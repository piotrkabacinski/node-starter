# Hello, Node.js!

Dockerized Node.js project starter using following stack:

- [Node 22](https://nodejs.org/en)
- [Express.js 4](https://expressjs.com/)
- [Postgres 17](https://www.postgresql.org/)
- [Redis 7](https://redis.io/)
- [TypeORM](https://typeorm.io/#/)
- [OpenApi](https://www.openapis.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

## Docker

```Bash
# Create .env file based on template file:
cp .env.template .env

nvm use

npm i

docker-compose build
docker-compose up
```

When installing new dependencies, don't forget to install them within docker-container:

```
docker-compose run --rm app npm i
```

## Prisma

[Docs](https://www.prisma.io/docs/)
[VS Code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

In case of change is `prisma/schema.prisma` run:

```sh
docker-compose run --rm app npm run migration
```

```sh
# Create and run migration:
npm run migration <migration name>

# Apply migrations on production server:
npm run migration:deploy
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

1. Set `synchronize: false` in `ormconfig.js` in development config.
2. Make change in schema (for example update property name in some entity).
3. [Create migration file](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations): `docker-compose run --rm app npm run migration:generate` - typeorm will compare current schema with entities and add required queries to migration file (`src/db/migration/<timestamp>-PostRefactoring`).
4. Run migrations to apply your change to the database: `docker-compose run --rm npm run migration:run`.

## Redis

```Bash
docker exec -it <container name prefix>_redis_1 redis-cli
```

## Insomnia

For manual tests of Todo API example you can import [Insomnia](https://insomnia.rest/) workspace from `insomnia.json`.

## Deployment

App is configured for [Heroku](https://www.heroku.com/) environment. See [Heroku.md](Heroku.md) file for deployment details.
