import { createConnection, getConnectionOptions } from 'typeorm';

export default async function dbConnect() {
  const connectionOptions = await getConnectionOptions();

  // https://typeorm.io/#/using-ormconfig/overriding-options-defined-in-ormconfig
  Object.assign(connectionOptions, {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    host: process.env.POSRGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  return await createConnection(connectionOptions);
}
