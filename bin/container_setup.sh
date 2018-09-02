#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/..

# Set up directory structures
ln -fs .env.production .env

# Set up python
curl https://bootstrap.pypa.io/get-pip.py | python3
pip3 install virtualenvwrapper
pip3 install -r requirements.txt
