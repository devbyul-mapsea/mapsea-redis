const dotEnvPath = (NODE_MODE: string) => {
  let path = process.cwd();

  switch (NODE_MODE) {
    case process.env.NODE_MODE_DEV:
      path += '/env/.env.developer';
      break;
    case process.env.NODE_MODE_PROD:
      path += '/env/.env.production';
      break;
    default:
      path += '/env/.env.local';
      break;
  }

  return path;
};

export { dotEnvPath };
