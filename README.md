# Base Flask Setup

[![Build Status](https://drone.albertyw.com/api/badges/albertyw/base-flask/status.svg)](https://drone.albertyw.com/albertyw/base-flask)
[![Maintainability](https://qlty.sh/gh/albertyw/projects/albertyw.com/maintainability.svg)](https://qlty.sh/gh/albertyw/projects/albertyw.com)
[![Code Coverage](https://qlty.sh/gh/albertyw/projects/albertyw.com/coverage.svg)](https://qlty.sh/gh/albertyw/projects/albertyw.com)
[![Varsnap Status](https://www.varsnap.com/project/bcc034eb-19df-42dc-aa30-8765868f10ec/varsnap_badge.svg)](https://www.varsnap.com/project/bcc034eb-19df-42dc-aa30-8765868f10ec/)

This is a base Flask/Gunicorn/nginx setup, useful as a skeleton for building
simple web apps from.  This is meant to be used for websites, as opposed to
pure JSON sites which would be better developed using a different language or
framework (e.g. [sanic](https://github.com/channelcat/sanic)).

Features
--------

 - Developed specifically for Python 3
 - Minimal but up-to-date python dependencies
 - 100% test coverage
 - No issues from Code Climate
 - PEP8 compliant
 - Documented setup and usage procedures
 - Includes setting up secure and fast nginx/gunicorn in production
 - Docker support

Users
-----

These repositories are based on base-flask:

 - [albertyw/albertyw.com](https://github.com/albertyw/albertyw.com)
 - [albertyw/pharmadataassociates](https://github.com/albertyw/pharmadataassociates)
 - [albertyw/chase-center-calendar](https://github.com/albertyw/chase-center-calendar)

Setup
-----

Modify and run `baseflask/scaffold.sh` to create a copy of base-flask for your
project needs, then run `bin/setup.sh` to set up the host.

Base-flask is designed to work with a minimally sized [AWS EC2](https://aws.amazon.com/ec2/instance-types/)
or [DigitalOcean](https://www.digitalocean.com/pricing/droplets)
instance, running a modern version of Ubuntu or Debian.

### CDN

A CDN like [cloudflare](https://www.cloudflare.com/) can also be added on to boost
speed.  A good cloudflare setup would be to use full SSL encryption and to
install an origin certificate so that requests are encrypted end-to-end.

Development
-----------

### Setup
Using [python venv](https://docs.python.org/3/library/venv.html) and
[direnv](https://github.com/direnv/direnv)

```bash
python3.14 -m venv env
printf "source env/bin/activate\nunset PS1\n" > .envrc
direnv allow
pip install -e .[test]
ln -s .env.development .env
npm install

# Install shellcheck
# brew install shellcheck
# sudo apt-get install shellcheck
```

### Spinning up the server:

```bash
npm run build:dev
python app/serve.py
```

### Running tests:

```bash
ruff check .
mypy .
shellcheck --exclude=SC1091 bin/*.sh
coverage run -m unittest discover
npm test
```

### CI/CD

This repo uses:

```bash
# Switch to python 3
pyenv local 3.14
pip install -e .[test]
ln -s .env.development .env

# Test
ruff check .
mypy .
shellcheck --exclude=SC1091 bin/*.sh
coverage run -m unittest discover
coverage report
npm test

# Deployment
ssh example.com website/bin/deploy.sh
```

### Building and starting the docker container

```bash
docker build -t $PROJECT_NAME:test .
docker run -t -i -p 127.0.0.1:$INTERNAL_PORT:5000 $PROJECT_NAME:test
```

Production
----------

### Setup

Run this once on a new server to set up the web app:

```bash
bin/setup.sh
```

### Deployment

Run this every time for a new commit to the repository:

```bash
bin/deploy.sh
```
