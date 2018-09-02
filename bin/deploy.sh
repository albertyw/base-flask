#!/bin/bash
# This script will build and deploy a new docker image

# Update repository
cd $GIT_REPOSITORY || exit 1
git checkout master
git fetch -tp
git pull

# Build and start container
docker build -t $PROJECT_NAME:production .
docker stop $(docker ps -q --filter ancestor=$PROJECT_NAME:production )
docker run --detach --restart always -p 127.0.0.1:5000:5000 $PROJECT_NAME:production

# Cleanup docker
docker container prune -f
docker image prune -f
