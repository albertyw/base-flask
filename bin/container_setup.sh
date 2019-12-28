#!/bin/bash

# This is the script that is run inside a new container to set it up at first

set -exuo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR/.."

# Set up python
curl https://bootstrap.pypa.io/get-pip.py | python3.8
pip3 install -r requirements.txt

# Set up node
curl -sL https://deb.nodesource.com/setup_11.x | bash -
npm install

# Set up supervisor
cp config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
