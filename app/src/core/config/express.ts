import express from 'express';
import cors, { CorsOptions } from 'cors';
import rateLimit from 'express-rate-limit';
import Path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { logger, stream } from './logger';

import statusRouter from '../../domain/route/status/index';
import redisRouter from '../../domain/route/redis/index';
const app = express();

/**
 * JSON & URLencoded
 */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/**
 * CORS
 * 해당하는 서비스 url 을 origin에 추가하여 화이트리스트로 작성 합니다.
 */
const origin = [];
const corsOption: CorsOptions = {
  //   origin,
  methods: 'GET,POST,PATCH,PUT,DELETE',
  maxAge: 3600,
  optionsSuccessStatus: StatusCodes.OK,
};
app.use(cors(corsOption));

/**
 * Rate Limit Setting
 */
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1분 간격
  max: 30, // windowMs동안 최대 호출 횟수
  message:
    'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.set('trust proxy', 1);

/**
 * Logger [ morgan ]
 */
app.use(morgan('combined', { stream }));

/**
 * Route
 */
app.use('/status', statusRouter);
app.use('/redis', redisRouter);
// app.use('/whitelist');

/**
 * Swagger
 */
if (process.env.NODE_MODE != 'production') {
  const swaggerPath = '/api-docs';

  logger.info(`Swagger On : ${swaggerPath}`);

  const rootDir = process.cwd() as string;
  const swaggerSpec = YAML.load(Path.join(rootDir, '/dist/swagger.yaml'));
  const swaggerOptions = { docExpansion: 'none' };
  const swaggerUiOptions = { explorer: true };

  app.use(
    swaggerPath,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions, swaggerOptions)
  );
}

/**
 * Route Error NotFound
 */
app.use((req, res) => {
  res.status(404).send('Not Found');
});

export default app;
