#!/bin/bash

# This is a script that can be run on a freshly setup server (see the README
# for more details) and bring it up to a production-ready state.

# Install uwsgi
mkdir -p /var/www/app/logs/uwsgi

# Set up uwsgi
rm -f /etc/systemd/system/uwsgi.service

# /bin/bash
supervisord
