#!/bin/bash

# This script will build and deploy a new docker image

set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

source .env

if [ "$ENV" = "production" ]; then
    # Update repository
    git checkout master
    git fetch -tp
    git pull
fi

# Build and start container
docker build -t $PROJECT_NAME:$ENV .
docker stop $PROJECT_NAME || echo
docker container prune --force --filter "until=336h"
docker run \
    --detach \
    --restart=always \
    --publish=127.0.0.1:$INTERNAL_PORT:$INTERNAL_PORT \
    --mount type=bind,source="$(pwd)"/app/static,target=/var/www/app/app/static \
    --name=$PROJECT_NAME $PROJECT_NAME:$ENV

if [ "$ENV" = "production" ]; then
    # Cleanup docker
    docker image prune --force --filter "until=336h"

    # Update nginx
    sudo service nginx reload
fi
