#!/bin/bash

# Update repository
cd /var/www/website/ || exit 1
git checkout master
git pull

# Update python packages
virtualenvlocation=$(which virtualenvwrapper.sh)
# shellcheck source=/dev/null
source "$virtualenvlocation"
workon $GIT_REPOSITORY_NAME
pip install -r requirements.txt

# Make generated static file directory writable
sudo chown www-data app/static/gen
sudo chown www-data app/static/.webassets-cache

# Restart services
sudo service nginx restart
sudo service uwsgi restart
