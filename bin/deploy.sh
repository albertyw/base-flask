#!/bin/bash

# This script will build and deploy a new docker image

set -exuo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

set +x  # Do not print contents of .env
source .env
set -x

if [ "$ENV" = "production" ]; then
    # Update repository
    git checkout master
    git fetch -tp
    git pull
fi

# Build container and network
docker pull "$(grep FROM Dockerfile | awk '{print $2}')"
docker build -t "$PROJECT_NAME:$ENV" .
docker network inspect "$PROJECT_NAME" &>/dev/null ||
    docker network create --driver bridge "$PROJECT_NAME"

# Start container
docker stop "$PROJECT_NAME" || true
docker container rm "$PROJECT_NAME" || true
docker run \
    --detach \
    --restart=always \
    --publish="127.0.0.1:$INTERNAL_PORT:$INTERNAL_PORT" \
    --network="$PROJECT_NAME" \
    --mount type=bind,source="$(pwd)"/app/static,target=/var/www/app/app/static \
    --mount type=bind,source="$(pwd)"/logs,target=/var/www/app/logs \
    --name="$PROJECT_NAME" "$PROJECT_NAME:$ENV"

if [ "$ENV" = "production" ]; then
    # Cleanup docker
    docker container prune --force --filter "until=168h"
    docker image prune --force --filter "until=168h"
    docker volume prune --force
    docker network prune --force

    # Update nginx
    sudo service nginx reload
fi
