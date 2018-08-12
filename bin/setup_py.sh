#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.  This script
# requires sudo privileges to work and it should already be scaffolded using
# bin/scaffold.sh

# Clone repository
git clone "$GIT_REPOSITORY"
sudo mkdir -p /var/www
rm -rf /var/www/$PROJECT_NAME
sudo mv "$PROJECT_NAME" /var/www/$PROJECT_NAME
cd /var/www/$PROJECT_NAME || exit 1
ln -s .env.production .env
sudo ln -s /var/www/$PROJECT_NAME ~/$PROJECT_NAME

# Install uwsgi
sudo mkdir -p /var/log/uwsgi/
sudo chown www-data:www-data /var/log/uwsgi
sudo apt install -y build-essential python-minimal
sudo apt install -y python3-dev python3-setuptools

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
