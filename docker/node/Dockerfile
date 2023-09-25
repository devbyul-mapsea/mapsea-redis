# Template: Node.js dockerfile
# Description: Include this file in the root of application to build a docker

# Select the official image based on Node.js 20.5
FROM node:20.5
RUN echo 'Docker From `node:20.5`'

# Create app directory for the docker image
RUN mkdir -p /app
WORKDIR /app
RUN echo '[Run] mkdir -p /app'
RUN echo 'Docker WorkDirectory `/app`'

# Install app dependencies from package.json. 
# If modules are not included in the package.json file enter a RUN command.
# E.g. RUN npm install <module-name>
COPY ./app/package.json .
RUN npm install

COPY ./app .
RUN rm -rf ./dist

# Build Source Code
RUN npm install typescript -g
RUN tsc -p tsconfig.json

# Build Swagger
RUN npm install swagger-cli -g
RUN swagger-cli bundle ./docs/swagger.yaml --outfile ./dist/swagger.yaml --type yaml

# Install pm2
RUN npm install pm2 -g

# Install pm2-logrotate
RUN pm2 install pm2-logrotate

# Health Check ( interval 5m / timeout 3s )
HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:4200/ || exit 1

# Start Node Server - Redis Reverse Proxy Server
# When starting the container with pm2, it initializes but then automatically shuts down. 
# Therefore, it is essential to use pm2-runtime to keep the container running.
CMD pm2-runtime start ecosystem.config.js --env ${NODE_MODE}