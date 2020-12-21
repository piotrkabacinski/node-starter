import { createConnection, getConnectionOptions } from "typeorm";

export default async function dbConnect() {
  const connectionOptions = await getConnectionOptions();

  // https://typeorm.io/#/using-ormconfig/overriding-options-defined-in-ormconfig
  Object.assign(connectionOptions, {
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    type: "postgres",
    username: process.env.POSTGRES_USER,
  });

  return await createConnection(connectionOptions);
}
