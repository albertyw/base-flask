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
# The key is scoped to the docker repository with signed-by; apt-key added it
# to a global keyring trusted for every repository, and is gone from modern
# Ubuntu entirely.
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |
    sudo gpg --dearmor --yes -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" |
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
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
sudo mkdir -p "/var/log/nginx/$PROJECT_NAME/"
sudo rm -rf /var/www/html

# Secure nginx
sudo mkdir -p /etc/nginx/ssl
# Download to a temporary file and validate it before installing it: piping
# straight into place leaves an empty or truncated dhparams file when the
# fetch fails, which nginx then refuses to start with.
DHPARAMS="$(mktemp)"
curl --fail --silent --show-error --location \
    https://ssl-config.mozilla.org/ffdhe2048.txt --output "$DHPARAMS"
openssl dhparam -in "$DHPARAMS" -check -noout
sudo install -m 0644 "$DHPARAMS" /etc/nginx/ssl/dhparams.pem
rm "$DHPARAMS"
# Copy server.key and server.pem to /etc/nginx/ssl.  The private/public key
# pair can be generated from Cloudflare or letsencrypt.

# Start nginx
docker exec nginx /etc/init.d/nginx reload

# Set up directory structures
ln -s .env.production .env
