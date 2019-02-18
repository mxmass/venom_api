# Home made VENoM

## Overview

VENoM stands for VueJS, Express, NodeJS & MongoDB ... not mine idea, but i like it ;)

This bit of the app is an API (with JWT auth and AWS S3 direct upload)
Package is dockerized
Couple of shell scripts make life a bit easier
Don't forget to make scripts executable

```
chmod a+x <filename>
```

## Running in development mode

```
./fresh_docker
```

## Running tests

```
./run_test
```

## Useful docker commands

```
docker-compose stop
docker-compose down --force
docker rmi $(docker images -q)
npm cache clean --force
```
## api/.env

In order to make AWS direct upload working you need to setup an AWS Bucket and make changes to .env file in ./api

```
AWS_ACCESS_KEY=
AWS_ACCESS_SECRET=
AWS_BUCKET_NAME=
AWS_BUCKET_UPLOAD_PATH=
```
