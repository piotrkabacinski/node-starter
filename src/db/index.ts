import { createConnection, getConnectionOptions } from "typeorm";

export default async function dbConnect() {
  const connectionOptions = await getConnectionOptions();
  return await createConnection(connectionOptions);
}
