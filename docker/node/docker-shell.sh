# Local 에서 Dockerfile 이 정상적으로 구동하는지 테스트 하기 위한 코드입니다.
docker build -t my-node-app -f ./Dockerfile .

# develop 
docker run --env NODE_MODE=developer -p 9999:4200 my-node-app