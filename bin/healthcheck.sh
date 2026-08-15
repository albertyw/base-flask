#!/bin/bash

set -euxo "pipefail"
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR"/..

set +x  # Do not print contents of .env
source .env
set -x

if [ -z "$SERVER_NAME" ]; then
    exit 0
fi
curl \
    --fail \
    --header "Host: $SERVER_NAME" \
    "http://localhost:5000/health"
