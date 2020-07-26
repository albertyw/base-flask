#!/bin/bash

set -euxo "pipefail"
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

source .env

if [ -z "$SERVER_NAME" ]; then
    exit 0
fi
curl \
    --fail \
    --resolve "$SERVER_NAME:443:localhost" \
    "https://$SERVER_NAME/health"
