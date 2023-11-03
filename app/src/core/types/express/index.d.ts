export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Node Mode
      NODE_MODE: string;
      NODE_MODE_DEV: string;
      NODE_MODE_PROD: string;

      // Server Port
      SERVER_PORT: number;

      // Service Url
      URL_MAPSEA_SSO_API: string;

      // Redis Standard
      REDIS_STANDARD_HOST: string;
      REDIS_STANDARD_PORT: number;
      REDIS_STANDARD_USERNAME: string;
      REDIS_STANDARD_PASSWORD: string;
    }
  }
}
