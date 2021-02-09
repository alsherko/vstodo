declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_DATABASE: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    JWT_KEY: string;
  }
}
