#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.  This script
# requires sudo privileges to work and it should already be scaffolded using
# bin/scaffold.sh

# Setup server
sudo hostnamectl set-hostname "$HOSTNAME"

# Clone repository
git clone "$GIT_REPOSITORY"
sudo mkdir -p /var/www
rm -rf /var/www/$PROJECT_NAME
sudo mv "$PROJECT_NAME" /var/www/$PROJECT_NAME
cd /var/www/$PROJECT_NAME || exit 1
ln -s .env.production .env
sudo ln -s /var/www/$PROJECT_NAME ~/$PROJECT_NAME

# Install nginx
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx

# Configure nginx
sudo rm -rf /etc/nginx/sites-available
sudo rm -rf /etc/nginx/sites-enabled/*
sudo ln -s /var/www/$PROJECT_NAME/config/sites-available/app /etc/nginx/sites-enabled/$PROJECT_NAME-app
sudo ln -s /var/www/$PROJECT_NAME/config/sites-available/headers /etc/nginx/sites-enabled/$PROJECT_NAME-headers
sudo rm -rf /var/www/html

# Secure nginx
sudo mkdir -p /etc/nginx/ssl
sudo openssl dhparam -out /etc/nginx/ssl/dhparams.pem 2048
# Copy server.key and server.pem to /etc/nginx/ssl.  The private/public key
# pair can be generated from Cloudflare or letsencrypt.
sudo service nginx restart

# Install uwsgi
sudo mkdir -p /var/log/uwsgi/
sudo chown www-data:www-data /var/log/uwsgi
sudo apt-get install -y build-essential python-minimal
sudo apt-get install -y python3-dev python3-setuptools

# Install python/pip/virtualenvwrapper
curl https://bootstrap.pypa.io/get-pip.py | sudo python2
curl https://bootstrap.pypa.io/get-pip.py | sudo python3
sudo pip2 install virtualenvwrapper
sudo pip3 install virtualenvwrapper

# Install python packages
# shellcheck disable=SC1091
. /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv --python=/usr/bin/python3 "$PROJECT_NAME"
pip install -r /var/www/$PROJECT_NAME/requirements.txt
sudo ln -s "$HOME/.virtualenvs" /var/www/.virtualenvs

# Make generated static file directory writable
sudo chown www-data app/static/gen
sudo chown www-data app/static/.webassets-cache

# Set up uwsgi
sudo rm -f /etc/systemd/system/$PROJECT_NAME-uwsgi.service

# Start uwsgi
sudo systemctl enable /var/www/$PROJECT_NAME/config/uwsgi/$PROJECT_NAME-uwsgi.service
sudo systemctl start $PROJECT_NAME-uwsgi.service
