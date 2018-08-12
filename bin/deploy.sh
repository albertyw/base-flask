#!/bin/bash
# This script will build and deploy a new docker image

# Update repository
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
git checkout master
git fetch -tp
git pull

# Build and start container
docker build -t $PROJECT_NAME:production .
docker stop $(docker ps -q --filter ancestor=$PROJECT_NAME:production )
docker run --detach --restart always -p 127.0.0.1:8080:8080 $PROJECT_NAME:production

# Cleanup docker
docker container prune -f
docker image prune -f
