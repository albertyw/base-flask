FROM ubuntu:18.04
LABEL maintainer="git@albertyw.com"
EXPOSE 8080

RUN apt-get update -y
RUN apt-get install -y build-essential python-minimal python3-dev python3-setuptools curl supervisor

RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app

# App-specific setup
RUN bin/container_setup.sh

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENTRYPOINT ["bin/start.sh"]
