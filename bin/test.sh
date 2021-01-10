#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

echo "--- Set up python"
pip3 install -r requirements-test.txt

echo "--- Set up shellcheck"
apt-get update
apt-get install shellcheck

echo "--- Set up node"
npm install

echo "--- Set up code-climate test reporter"
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "bin/cc-test-reporter"
chmod +x "bin/cc-test-reporter"

echo "--- Set up hadolint"
curl -L https://github.com/hadolint/hadolint/releases/download/v1.17.3/hadolint-Linux-x86_64 > "bin/hadolint"
chmod +x "bin/hadolint"

echo "--- Set up environment"
ln -s .env.development .env



echo "--- Lint python"
flake8

echo "--- Lint shell"
shellcheck --exclude=SC1091 bin/*.sh

echo "--- Lint dockerfile"
bin/hadolint Dockerfile --ignore=DL3008 --ignore=SC2046 --ignore=SC2006

echo "--- Python type check"
mypy app --ignore-missing-imports --strict

echo "--- Test python"
bin/cc-test-reporter before-build
coverage run -m unittest discover
exitcode="$?"
coverage report -m

echo "--- Test node"
npm test

echo "--- Report python coverage"
coverage xml -i
bin/cc-test-reporter after-build --exit-code "$exitcode"
