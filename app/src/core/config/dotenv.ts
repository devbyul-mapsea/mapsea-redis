import { config } from 'dotenv';
import { dotEnvPath } from '../utility/path';

config({ path: dotEnvPath(process.env.NODE_MODE) });

const dotEnv = {
  node: {
    mode: process.env.NODE_MODE,
    dev: process.env.NODE_MODE_DEV,
    prod: process.env.NODE_MODE_PROD,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
  redis: {
    standard: {
      host: process.env.REDIS_STANDARD_HOST,
      port: process.env.REDIS_STANDARD_PORT,
      username: process.env.REDIS_STANDARD_USERNAME,
      password: process.env.REDIS_STANDARD_PASSWORD,
    },
  },
};

export default dotEnv;
