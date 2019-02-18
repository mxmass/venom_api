docker-compose stop
docker-compose down
docker rmi $(docker images -q)
npm cache clean --force
# cp api/Dockerfile.test api/Dockerfile
# cp docker-compose.test.yml docker-compose.yml
docker-compose up --abort-on-container-exit --exit-code-from test_runner -f docker-compose.test.yml
