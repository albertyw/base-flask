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

# gunicorn runs as www-data, but the log directory is a host bind mount whose
# ownership comes from the host.  Grant group access instead of chowning it:
# the mount is inside the deploy user's checkout, and taking ownership would
# lock that user out of a directory git needs to write.
mkdir -p logs/gunicorn
chgrp -R www-data logs/gunicorn
chmod -R g+w logs/gunicorn

# Run supervisor to run gunicorn
supervisord -c config/supervisord.conf
