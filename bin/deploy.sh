#!/bin/bash

docker build -t baseflask:production .
docker run --detach --restart always -p 8080:8080 baseflask:production
docker stop $(docker ps -q --filter ancestor=baseflask:production )
docker container prune -f
docker image prune -f
