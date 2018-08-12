#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.  This script
# requires sudo privileges to work and it should already be scaffolded using
# bin/scaffold.sh

# Install uwsgi
sudo mkdir -p /var/www/app/logs/uwsgi
sudo chown www-data:www-data /var/www/app/logs/uwsgi

# Make generated static file directory writable
sudo chown www-data app/static/gen
sudo chown www-data app/static/.webassets-cache

# Set up uwsgi
sudo rm -f /etc/systemd/system/$PROJECT_NAME-uwsgi.service

# Start uwsgi
sudo systemctl enable /var/www/$PROJECT_NAME/config/uwsgi/$PROJECT_NAME-uwsgi.service
sudo systemctl start $PROJECT_NAME-uwsgi.service
