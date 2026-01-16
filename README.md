# Hello, Node.js!

Dockerized Node.js project starter using following stack:

- [Node 24](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres 18](https://www.postgresql.org/)
- [Redis 8](https://redis.io/)
- [OpenApi](https://www.openapis.org/)
- [Express.js 5](https://expressjs.com/)
- [BullMQ](https://docs.bullmq.io/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)

## Setup

```Bash
# Clone repo:
git clone git@github.com:piotrkabacinski/node-starter.git --depth 1

# Create .env file based on template file:
cp .env.template .env

docker compose build

# Install dependencies:
docker compose run --rm app pnpm i

# Create Prisma client:
docker compose run --rm app pnpm run prisma -- generate

# Run migrations:
docker compose run --rm app pnpm run migration:deploy

# Run server:
docker compose up
```

When installing new dependencies locally do it within container as well:

```sh
docker compose run --rm app pnpm i
```

## Prisma ORM

[Docs](https://www.prisma.io/docs/)

If using VS Code try [prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for better DX.

When changing prisma's schema (`src/db/schema.prisma`) run migration command:

```sh
# Create and run migration:
pnpm run migration <migration name>

# Apply migrations on production server after deploy:
pnpm run migration:deploy
```

## Tests

```sh
docker compose run --rm app pnpm t
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
