#!/bin/sh
docker-compose stop
docker-compose down --force
docker rmi $(docker images -q)
npm cache clean --force
cp api/Dockerfile.dev api/Dockerfile
cp docker-compose.dev.yml docker-compose.yml
docker-compose up --build
