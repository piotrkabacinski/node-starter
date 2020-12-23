declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    NODE_ENV: "dev" | "prod" | "test";
    REDIS_HOST: string;
    REDIS_PORT: string;
    APP_PORT: string;
  }
}
