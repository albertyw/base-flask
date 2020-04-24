# Needed for python 3.8
FROM ubuntu:20.04

LABEL maintainer="git@albertyw.com"
EXPOSE $INTERNAL_PORT

# Set locale
RUN apt-get update && apt-get install -y --no-install-recommends \
    locales \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gpg-agent software-properties-common wget   `: Needed for add-apt-repository` \
    && wget https://deb.nodesource.com/setup_12.x && bash setup_12.x \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl                        `: Basic-packages` \
    gcc g++ make                                `: Needed for python/node native extensions` \
    git                                         `: Needed for pip install from github` \
    supervisor                                  `: Runnning python in daemon mode` \
    libssl-dev                                  `: SSL extensions for python` \
    python3.8                                   `: Python` \
    python3.8-dev python3-setuptools            `: Support for installing Python packages` \
    nodejs                                      `: Javascript assets` \
    && rm -rf /var/lib/apt/lists/*

# Set up directory structures
RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app

# App-specific setup
RUN bin/container_setup.sh

# Set startup script
CMD ["bin/start.sh"]
