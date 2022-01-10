#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.

set -exuo pipefail
IFS=$'\n\t'

# Minify static files
npm run minify

# Run supervisor to run uwsgi
supervisord -c config/supervisord.conf
