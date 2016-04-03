#!/bin/bash

# Update repository
cd /var/www/website/
git checkout master
git pull

# Update python packages
source `which virtualenvwrapper.sh`
workon VIRTUALENV
pip install -r requirements.txt

# Configure settings
cd GIT_REPOSITORY
ln -sf .env.production .env

# Restart services
sudo service nginx restart
sudo service uwsgi restart
