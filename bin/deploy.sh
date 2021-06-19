#!/bin/bash

# This script will build and deploy a new docker image

set -exuo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/.. || exit 1

CONTAINER="$PROJECT_NAME"
PORT="$INTERNAL_PORT"
NETWORK="$CONTAINER"_net
DEPLOY_BRANCH="${1:-}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
set +x  # Do not print contents of .env
source .env
set -x

if [ -n "$DEPLOY_BRANCH" ]; then
    # Update repository
    git checkout "$DEPLOY_BRANCH"
    git fetch -tp
    git pull
fi

# Build container and network
docker pull "$(grep FROM Dockerfile | awk '{print $2}')"
docker build -t "$CONTAINER:$BRANCH" .
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
    --mount type=bind,source="$(pwd)"/static,target=/var/www/app/static \
    --mount type=bind,source="$(pwd)"/logs,target=/var/www/app/logs \
    --name="$CONTAINER" "$CONTAINER:$BRANCH"

if [ "$ENV" = "production" ]; then
    if [ "$BRANCH" = "master" ]; then
        # Cleanup docker
        docker system prune --force --filter "until=168h"
        docker volume prune --force
    fi

    # Update nginx
    sudo cp "$HOME/$PROJECT_NAME/config/nginx/app" "/etc/nginx/sites-enabled/$PROJECT_NAME-app"
    docker exec nginx /etc/init.d/nginx reload
fi
