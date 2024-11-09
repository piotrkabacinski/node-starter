import "reflect-metadata";
import { DataSource } from "typeorm";

import ormconfig from "../../ormconfig";

const AppDataSource = new DataSource(ormconfig);

export const getAppDataSourceInstance = async (): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return AppDataSource;

  await AppDataSource.initialize();

  return AppDataSource;
};
