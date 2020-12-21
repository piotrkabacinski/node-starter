declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    PORT: string;
    NODE_ENV: 'dev' | 'prod' | 'test'
  }
}
