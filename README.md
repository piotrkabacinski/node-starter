# Hello, Node.js!

## Docker

```Bash
docker build -t hello-node .
docker run -it -p 3000:3000 -v $PWD:/usr/src/app hello-node bash
npm start # http://localhost:3000
```

## TODOs

- Redis
- Pino
- Kolejki (bullmq)
- Fastify
