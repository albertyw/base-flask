FROM ubuntu:18.04
LABEL maintainer="git@albertyw.com"
EXPOSE 5000

# Install updates and system packages
RUN apt update
RUN apt upgrade -y
RUN apt install -y build-essential locales

# Set locale
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Set up directory structures
RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app

# App-specific setup
RUN bin/container_setup.sh

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["bin/start.sh"]
