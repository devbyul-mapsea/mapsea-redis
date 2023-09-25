# Docker Build Node
docker build -t my-node-app -f ./docker/node/Dockerfile ./app

# develop 
docker run --name node-developer --env NODE_MODE=developer -p 9999:4200 my-node-app
docker run --name node-production --env NODE_MODE=production -p 9999:4200 my-node-app

docker build my-redis-app -f ./docker/redis/standard/Dockerfile .

docker container ls
docker container ls --latest --no-trunc


# 컨테이너, 이미지 모두 삭제 (실행중인 컨테이너 제외)
sudo docker system prune
 

# 구동중인 모든 도커 컨테이너들을 중지시키고, 삭제
sudo docker stop $(docker ps -a -q)
sudo docker rm $(docker ps -a -q)

# 모든 이미지 삭제
sudo docker rmi $(docker images -q)

# Exit 상태의 모든 컨테이너 삭제하기
sudo docker rm $(docker ps --filter 'status=exited' -a -q)
