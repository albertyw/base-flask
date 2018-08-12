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
sudo apt update
sudo apt install -y nginx

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
