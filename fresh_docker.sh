#!/bin/sh
docker-compose stop
docker-compose down
docker rmi $(docker images -q)
npm cache clean --force
docker-compose up --build
