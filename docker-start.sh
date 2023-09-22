docker build -t my-node-app -f ./docker/node/Dockerfile .


# develop 
docker run -p 9999:9999 my-node-app
