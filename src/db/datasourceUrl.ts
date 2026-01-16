const {
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: db,
} = process.env;

export const datasourceUrl = `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`;
