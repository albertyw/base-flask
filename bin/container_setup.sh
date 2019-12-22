#!/bin/bash

# This is the script that is run inside a new container to set it up at first

set -exuo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$DIR/.."

# Install updates and system packages
apt-get update
apt-get install -y --no-install-recommends \
    build-essential \
    locales \
    software-properties-common \
    gcc \
    curl \
    supervisor \
    git \
    python-minimal \
    python-dev \
    python3-setuptools \
    python3.8 \
    python3.8-dev \
    nodejs
apt-get clean && rm -rf /var/lib/apt/lists/*

# Set locale
sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && locale-gen

# Set up python
curl https://bootstrap.pypa.io/get-pip.py | python3.8
pip3 install -r requirements.txt

# Set up node
curl -sL https://deb.nodesource.com/setup_11.x | bash -
npm install

# Set up supervisor
cp config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
