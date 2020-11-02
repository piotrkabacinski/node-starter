import { createConnection, getConnectionOptions } from "typeorm";

export default async function () {
  const connectionOptions = await getConnectionOptions();
  return await createConnection(connectionOptions);
}
