# Hello, Node.js!

Dockerized Node.js project starter using following stack:

- [Node 22](https://nodejs.org/en)
- [Express.js 4](https://expressjs.com/)
- [Postgres 17](https://www.postgresql.org/)
- [Redis 7](https://redis.io/)
- [OpenApi](https://www.openapis.org/)
- [Prisma](https://www.prisma.io/)
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

TODO

## Redis

```Bash
docker exec -it <container name prefix>_redis_1 redis-cli
```

## Insomnia

For manual tests of Todo API example you can import [Insomnia](https://insomnia.rest/) workspace from `insomnia.json`.

## Deployment

App is configured for [Heroku](https://www.heroku.com/) environment. See [Heroku.md](Heroku.md) file for deployment details.
