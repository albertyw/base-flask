FROM python:3.6-alpine
MAINTAINER Albert Wang "git@albertyw.com"

RUN apt-get update -y
RUN apt-get install -y build-essential python-minimal python3-dev python3-setuptools

COPY . /base-flask
WORKDIR /base-flask

RUN ln -s .env.production .env
RUN pip install -r requirements.txt

ENTRYPOINT ["/entrypoint.sh"]

CMD ["/base-flask/start.sh"]
