#!/bin/bash

# Setup server
sudo hostnamectl set-hostname $HOSTNAME

# Clone repository
git clone $GIT_REPOSITORY
sudo mkdir -p /var/www
sudo mv $GIT_REPOSITORY_NAME /var/www/website
cd /var/www/website || exit 1
ln -s .env.production .env
sudo ln -s /var/www/website ~/website

# Install nginx
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx

# Configure nginx
sudo rm -r /etc/nginx/sites-available
sudo rm -r /etc/nginx/sites-enabled
sudo ln -s /var/www/website/config/sites-available /etc/nginx/sites-available
sudo ln -s /var/www/website/config/sites-enabled /etc/nginx/sites-enabled
sudo rm -r /var/www/html

# Secure nginx
sudo mkdir /etc/nginx/ssl
sudo openssl dhparam -out /etc/nginx/ssl/dhparams.pem 2048
# Copy server.key and server.pem to /etc/nginx/ssl
sudo service nginx restart

# Install uwsgi
sudo mkdir /var/log/uwsgi/
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
mkvirtualenv --python=/usr/bin/python3 $GIT_REPOSITORY_NAME
pip3 install -r /var/www/website/requirements.txt
sudo ln -s "$HOME/.virtualenvs" /var/www/.virtualenvs

# Make generated static file directory writable
sudo chown www-data app/static/gen
sudo chown www-data app/static/.webassets-cache

# Set up uwsgi
sudo rm -r /etc/uwsgi/apps-available
sudo rm -r /etc/uwsgi/apps-enabled
sudo ln -s /var/www/website/config/uwsgi /etc/uwsgi/apps-enabled
sudo service uwsgi restart
