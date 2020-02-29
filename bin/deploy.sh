#!/bin/bash

# This script will build and deploy a new docker image

set -exuo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

CONTAINER="$PROJECT_NAME"
PORT="$INTERNAL_PORT"
NETWORK="$CONTAINER"_net
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
docker build -t "$CONTAINER:$ENV" .
docker network inspect "$NETWORK" &>/dev/null ||
    docker network create --driver bridge "$NETWORK"

# Start container
docker stop "$CONTAINER" || true
docker container rm "$CONTAINER" || true
docker run \
    --detach \
    --restart=always \
    --publish="127.0.0.1:$PORT:$PORT" \
    --network="$NETWORK" \
    --mount type=bind,source="$(pwd)"/app/static,target=/var/www/app/app/static \
    --mount type=bind,source="$(pwd)"/logs,target=/var/www/app/logs \
    --name="$CONTAINER" "$CONTAINER:$ENV"

if [ "$ENV" = "production" ]; then
    # Cleanup docker
    docker container prune --force --filter "until=168h"
    docker image prune --force --filter "until=168h"
    docker volume prune --force
    docker network prune --force

    # Update nginx
    sudo service nginx reload
fi
