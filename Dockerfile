FROM ubuntu:18.04
MAINTAINER Albert Wang "git@albertyw.com"

RUN apt-get update -y
RUN apt-get install -y build-essential python-minimal python3-dev python3-setuptools curl
RUN curl https://bootstrap.pypa.io/get-pip.py | python3
RUN pip3 install virtualenvwrapper

COPY app /app
COPY .env.production /.env
COPY requirements.txt entrypoint.sh ./
RUN chmod +x entrypoint.sh

RUN pip install -r requirements.txt

ENTRYPOINT ["/entrypoint.sh"]
