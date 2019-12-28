# Needed for python 3.8
FROM ubuntu:18.04

LABEL maintainer="git@albertyw.com"
EXPOSE $INTERNAL_PORT

# Set locale
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Install updates and system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    software-properties-common        `: Needed for add-apt-repository` \
    build-essential locales curl      `: Basic-packages` \
    gcc                               `: Needed for python/node native extensions` \
    git                               `: Needed for pip install from github` \
    supervisor                        `: Runnning python in daemon mode` \
    libssl-dev                        `: SSL extensions for python` \
    python3.8-minimal                 `: Python` \
    python3-dev python3-setuptools    `: Support for installing Python packages` \
    nodejs                            `: Javascript assets` \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && locale-gen

# Set up directory structures
RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app

# App-specific setup
RUN bin/container_setup.sh

# Set startup script
CMD ["bin/start.sh"]
