import { createConnection, getConnectionOptions } from "typeorm";

export default async function dbConnect() {
  const connectionOptions = await getConnectionOptions();

  // Heroku's Postgres connection
  if (process.env.NODE_ENV === "production") {
    Object.assign(connectionOptions, {
      url: process.env.DATABASE_URL,
      logging: false,
      extra: {
        ssl: true,
      },
    });
  }

  return await createConnection(connectionOptions);
}
