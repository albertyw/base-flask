#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.

set -exuo pipefail
IFS=$'\n\t'

# Make compiled static files available
rm -rf static/mount/*
shopt -s extglob
cp -r static/!(mount) static/mount
shopt -u extglob

# Run supervisor to run gunicorn
supervisord -c config/supervisord.conf
