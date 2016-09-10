#!/bin/bash

# Setup directories
sudo mkdir -p /var/www/log/nginx
sudo mkdir -p /var/www/log/uwsgi
sudo chmod -R 777 /var/www/log
sudo ln -s /var/www/log/uwsgi /var/log/uwsgi
sudo ln -s /var/www/log/nginx /var/log/nginx
sudo ln -s ~/website /var/www/website

# Clone repository
git clone GIT_REPOSITORY
sudo mv GIT_REPOSITORY_NAME /var/www/website

# Install nginx
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx

# Configure nginx
sudo mv /etc/nginx/sites-available /etc/nginx/sites-available.bak
sudo mv /etc/nginx/sites-enabled /etc/nginx/sites-enabled.bak
sudo ln -s /var/www/website/config/sites-available /etc/nginx/sites-available
sudo ln -s /var/www/website/config/sites-enabled /etc/nginx/sites-enabled
sudo service nginx restart
sudo rm -r /var/www/html

# Secure nginx
openssl dhparam -out /etc/nginx/ssl/dhparams.pem 2048
# Copy server.crt and server.key to /etc/nginx/ssl
sudo service nginx restart

# Install uwsgi
sudo apt-get install -y uwsgi uwsgi-plugin-python3 python3-dev python3-setuptools

# Install python/pip/virtualenvwrapper
curl https://bootstrap.pypa.io/get-pip.py | sudo python2
curl https://bootstrap.pypa.io/get-pip.py | sudo python3
sudo pip2 install virtualenvwrapper
sudo pip3 install virtualenvwrapper

# Install python packages
# shellcheck disable=SC1091
. /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv --python=/usr/bin/python3 GIT_REPOSITORY_NAME
pip3 install -r /var/www/website/requirements.txt
sudo ln -s "$HOME/.virtualenvs" /var/www/.virtualenvs

# Set up uwsgi
sudo ln -s /var/www/website/config/uwsgi/website.ini /etc/uwsgi/apps-available/website.ini
sudo ln -s ../apps-available/website.ini /etc/uwsgi/apps-enabled/website.ini
sudo service uwsgi restart
