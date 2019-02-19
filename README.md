# API NodeJS, MongoDB

## Overview

This is a part of one of the ongoing projects

API => (Express, NodeJS, MongoDB) { ...

  Security: JWT,
  File_storage: AWS_S3 direct upload,
  Container: Docker,
  Tests: [mocha, chai]

}

Couple of shell scripts make life a bit easier (don't forget to make scripts executable)

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
