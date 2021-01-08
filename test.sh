#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# Initial setup
apt-get update
apt-get install -y --no-install-recommends gpg-agent software-properties-common wget
wget https://deb.nodesource.com/setup_14.x
bash setup_14.x

# Set up python
apt-get update
apt-get install -y --no-install-recommends build-essential curl gcc g++ make git supervisor libssl-dev python3.9 python3.9-dev python3-setuptools nodejs logrotate
pip install -r requirements.txt
pip install -r requirements-test.txt

# Set up node
npm install

# Set up environment
ln -s .env.development .env

# Set up code-climate test reporter
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "bin/cc-test-reporter"
chmod +x "bin/cc-test-reporter"

# Set up hadolint
curl -L https://github.com/hadolint/hadolint/releases/download/v1.17.3/hadolint-Linux-x86_64 > "bin/hadolint"
chmod +x "bin/hadolint"


# Lint python
flake8

# Lint shell
shellcheck --exclude=SC1091 bin/*.sh

# Lint dockerfile
bin/hadolint Dockerfile --ignore=DL3008 --ignore=SC2046 --ignore=SC2006

# Python type check
mypy app --ignore-missing-imports --strict

# Test python
bin/cc-test-reporter before-build
coverage run -m unittest discover
exitcode="$?"
coverage report -m

# Test node
npm test

# Report python coverage
coverage xml -i
bin/cc-test-reporter after-build --exit-code "$exitcode"
