# Hello, Node.js!

Dockerized Node.js project starter using following stack:

- [Node 22](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres 17](https://www.postgresql.org/)
- [Redis 7](https://redis.io/)
- [OpenApi](https://www.openapis.org/)
- [Express.js 5](https://expressjs.com/)
- [BullMQ](https://docs.bullmq.io/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)

## Setup

```Bash
# Clone repo:
git clone git@github.com:piotrkabacinski/node-starter.git --depth 1

# Create .env file based on template file:
cp .env.template .env

nvm use

npm i

docker compose build

# Run migrations:
docker compose run --rm app npm run migration:deploy

# Run server:
docker compose up
```

When installing new dependencies locally do it within container as well:

```sh
docker compose run --rm app npm i
```

## Prisma ORM

[Docs](https://www.prisma.io/docs/)

If using VS Code try [prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for better DX.

When changing prisma's schema (`src/db/schema.prisma`) run migration command:

```sh
# Create and run migration:
npm run migration <migration name>

# Apply migrations on production server after deploy:
npm run migration:deploy
```

## Tests

```sh
docker compose run --rm app npm t
```

## Postgres

```sh
docker exec -it <container name prefix>_db_1 psql -U postgres

\l # List all data bases
\c <db name> # Connect to DB
\dt # Show data base tables
```

## Redis

```sh
docker exec -it <container name prefix>_redis_1 redis-cli
```

## Insomnia

For manual tests of Todo API example you can import [Insomnia](https://insomnia.rest/) workspace from `insomnia.json`.

## Deployment

App is configured for [Heroku](https://www.heroku.com/) environment. See [Heroku.md](Heroku.md) file for deployment details.
