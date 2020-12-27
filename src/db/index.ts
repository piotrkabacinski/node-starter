import { createConnection, getConnectionOptions } from "typeorm";

export default async function dbConnect() {
  const connectionOptions = await getConnectionOptions();

  // Heroku's Postgres connection
  if (process.env.NODE_ENV === "production") {
    Object.assign(connectionOptions, {
      synchronize: true,
      url: process.env.DATABASE_URL,
      logging: true,
      // https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
  }

  return await createConnection(connectionOptions);
}
