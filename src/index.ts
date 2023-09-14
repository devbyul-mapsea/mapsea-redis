import app from './core/config/express';
import './core/config/redis';
import env from './core/config/dotenv';
import { logger } from './core/config/logger';

const PORT = env.server.port;
const MODE = env.node.mode;

app.listen(PORT, () => {
  logger.info(`Server listening on port : ${PORT}`);
  logger.info(`Server mode : ${MODE}`);
});
