#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.  This script
# requires sudo privileges to work and it should already be scaffolded using
# baseflask/scaffold.sh

set -exuo pipefail
IFS=$'\n\t'

# Setup server
sudo hostnamectl set-hostname "$HOSTNAME"

# Clone repository
cd ~
git clone "$GIT_REPOSITORY"

# Set up docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo usermod -aG docker "${USER}"

# Configure nginx
sudo rm /etc/nginx/nginx.conf
sudo rm -rf /etc/nginx/sites-available
sudo cp "$HOME/$PROJECT_NAME/config/nginx/nginx.conf" "/etc/nginx/nginx.conf"
sudo cp "$HOME/$PROJECT_NAME/config/nginx/gzip.conf" "/etc/nginx/snippets/gzip.conf"
sudo cp "$HOME/$PROJECT_NAME/config/nginx/headers.conf" "/etc/nginx/snippets/headers.conf"
sudo cp "$HOME/$PROJECT_NAME/config/nginx/ssl.conf" "/etc/nginx/snippets/ssl.conf"
sudo rm -rf /var/www/html

# Secure nginx
sudo mkdir -p /etc/nginx/ssl
curl https://ssl-config.mozilla.org/ffdhe2048.txt | sudo tee /etc/nginx/ssl/dhparams.pem > /dev/null
# Copy server.key and server.pem to /etc/nginx/ssl.  The private/public key
# pair can be generated from Cloudflare or letsencrypt.

# Start nginx
docker exec nginx /etc/init.d/nginx reload

# Set up directory structures
ln -s .env.production .env
