import { createClient } from 'redis';
import { logger } from './logger';
import dotEnv from './dotenv';

const connection_test_query = async (db_info: {
  host: string;
  port: number;
  username: string;
  password: string;
}) => {
  const { host, port, username, password } = db_info;
  const redis_url = `redis://${username}:${password}@${host}:${port}/0`;
  try {
    /**
     * The URL of the Redis server.
     * Format : [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
     * (More info avaliable at IANA).
     */
    const client = createClient({ legacyMode: true, url: redis_url });

    client.on('error', (err) => {
      throw err;
    });

    await client.connect().then(); // redis v4 연결 (비동기)
    const redis_cli = client.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

    const getHello = await redis_cli.sendCommand(['HELLO', '2']);
    const redis_info: { [key: string]: any } = {};
    for (let i = 0; i < getHello.length; i += 2) {
      redis_info[getHello[i]] = getHello[i + 1];
    }

    const { version, mode, role } = redis_info;
    const server_time = await redis_cli.time();
    logger.info(`Redis Connection : ${host}:${port}`);
    logger.info(` * Version : ${version}`);
    logger.info(` * Mode : ${mode}`);
    logger.info(` * Role : ${role}`);
    logger.info(` * ServerTime : ${server_time}`);

    redis_cli.quit();
  } catch (error: any) {
    logger.error(
      `[${host}:${port} Redis] Connection Error : ${error.message} url : ${redis_url}`
    );
    process.exit(1);
  }
};

(async () => {
  console.log('process.env : ', process.env);
  console.log('dotEnv : ', dotEnv);
  const { standard } = dotEnv.redis;
  [standard].map((db_info) => connection_test_query(db_info));
})();

const { host, port, username, password } = dotEnv.redis.standard;
const standard_url = `redis://${username}:${password}@${host}:${port}/0`;

const standard = createClient({ legacyMode: true, url: standard_url });

standard.connect().then();
const standard_cli = standard.v4;

export { standard_cli };
