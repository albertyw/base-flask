#!/bin/bash
# This script will build and deploy a new docker image

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

# Update repository
git checkout master
git fetch -tp
git pull

# Build and start container
docker build -t $PROJECT_NAME:production .
docker stop $PROJECT_NAME || echo
docker container prune -f
docker run --detach --restart always -p 127.0.0.1:$INTERNAL_PORT:$INTERNAL_PORT --name $PROJECT_NAME $PROJECT_NAME:production

# Cleanup docker
docker image prune -f --filter "until=14d"

# Update nginx
sudo service nginx reload
