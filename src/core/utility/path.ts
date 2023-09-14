const dotEnvPath = (NODE_MODE: string) => {
  let path = process.env.PWD;

  switch (NODE_MODE) {
    case process.env.NODE_MODE_DEV:
      path += '/env/.env.developer';
    case process.env.NODE_MODE_PROD:
      path += '/env/.env.production';
    default:
      path += '/env/.env.local';
  }

  return path;
};

export { dotEnvPath };
