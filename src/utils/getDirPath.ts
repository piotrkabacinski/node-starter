import { fileURLToPath } from "url";
import { dirname } from "path";

export const getDirPath = (url: string) => {
  const __filename = fileURLToPath(url);
  return dirname(__filename);
};
