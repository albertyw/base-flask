FROM ubuntu:18.04
LABEL maintainer="git@albertyw.com"

RUN apt-get update -y
RUN apt-get install -y build-essential python-minimal python3-dev python3-setuptools curl systemd
RUN curl https://bootstrap.pypa.io/get-pip.py | python3
RUN pip3 install virtualenvwrapper

RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app
RUN ln -fs .env.production .env
RUN chmod +x entrypoint.sh
RUN chmod +x bin/setup_py.sh

RUN pip install -r requirements.txt

ENTRYPOINT ["bin/setup_py.sh"]
