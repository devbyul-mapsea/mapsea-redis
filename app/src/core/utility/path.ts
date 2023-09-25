const dotEnvPath = (NODE_MODE: string) => {
  let path = process.cwd();

  switch (NODE_MODE) {
    case 'developer':
      path += '/env/.env.developer';
      break;
    case 'production':
      path += '/env/.env.production';
      break;
    default:
      path += '/env/.env.local';
      break;
  }

  return path;
};

export { dotEnvPath };
