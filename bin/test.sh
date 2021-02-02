#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

echo "--- Set up python"
pip3 install -r requirements-test.txt

echo "--- Set up shellcheck"
curl -L https://github.com/koalaman/shellcheck/releases/download/v0.7.1/shellcheck-v0.7.1.linux.x86_64.tar.xz > "bin/shellcheck.tar.xz"
tar xvf bin/shellcheck.tar.xz -C bin --strip-components=1 shellcheck-v0.7.1/shellcheck

echo "--- Set up node"
npm install

echo "--- Set up code-climate test reporter"
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "bin/cc-test-reporter"
chmod +x "bin/cc-test-reporter"

echo "--- Set up hadolint"
curl -L https://github.com/hadolint/hadolint/releases/download/v1.17.3/hadolint-Linux-x86_64 > "bin/hadolint"
chmod +x "bin/hadolint"

echo "--- Set up environment"
if [ ! -f .env ]; then
    ln -s .env.development .env
fi



echo "--- Lint python"
flake8

echo "--- Lint shell"
bin/shellcheck --exclude=SC1091 bin/*.sh

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
# Need to set CC_TEST_REPORTER_ID
bin/cc-test-reporter after-build --exit-code "$exitcode"
