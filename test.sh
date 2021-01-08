#!/bin/bash

# Set up python
pyenv local 3.9
pip install -r requirements.txt
pip install -r requirements-test.txt

# Set up node
nvm use 14
npm install

# Set up environment
ln -s .env.development .env

# Set up code-climate test reporter
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "${HOME}/bin/cc-test-reporter"
chmod +x "${HOME}/bin/cc-test-reporter"

# Set up hadolint
curl -L https://github.com/hadolint/hadolint/releases/download/v1.17.3/hadolint-Linux-x86_64 > "${HOME}/bin/hadolint"
chmod +x "${HOME}/bin/hadolint"


# Lint python
flake8

# Lint shell
shellcheck --exclude=SC1091 bin/*.sh

# Lint dockerfile
hadolint Dockerfile --ignore=DL3008 --ignore=SC2046 --ignore=SC2006

# Python type check
mypy app --ignore-missing-imports --strict

# Test python
cc-test-reporter before-build
coverage run -m unittest discover
exitcode="$?"
coverage report -m

# Test node
npm test

# Report python coverage
coverage xml -i
cc-test-reporter after-build --exit-code "$exitcode"
