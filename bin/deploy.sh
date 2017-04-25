#!/bin/bash

# This script is meant to be run on a server with the production app running.
# It can be called from a CI/CD tool like Codeship.

# Update repository
cd /var/www/website/ || exit 1
git checkout master
git pull

# Update python packages
virtualenvlocation=$(which virtualenvwrapper.sh)
# shellcheck source=/dev/null
source "$virtualenvlocation"
workon $PROJECT_NAME
pip install -r requirements.txt

# Make generated static file directory writable
sudo chown www-data app/static/gen
sudo chown www-data app/static/.webassets-cache

# Restart services
sudo service nginx restart
sudo systemctl restart uwsgi
