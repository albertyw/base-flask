# Base Flask Setup

[![Build status](https://badge.buildkite.com/d748e2b3d2491fefb1623165911eb37c04f8a32b9cb4908480.svg?branch=master)](https://buildkite.com/albertyw/base-flask)
[ ![Codeship Status for albertyw/base-flask](https://codeship.com/projects/7a732790-5535-0134-49ab-4625866fb5c2/status?branch=master)](https://codeship.com/projects/172030)
[![Updates](https://pyup.io/repos/github/albertyw/base-flask/shield.svg)](https://pyup.io/repos/github/albertyw/base-flask/)
[![Code Climate](https://codeclimate.com/github/albertyw/base-flask/badges/gpa.svg)](https://codeclimate.com/github/albertyw/base-flask)
[![Test Coverage](https://codeclimate.com/github/albertyw/base-flask/badges/coverage.svg)](https://codeclimate.com/github/albertyw/base-flask/coverage)
[![Hound CI](https://img.shields.io/badge/houndci-monitored-blue.svg)](https://houndci.com/)
[![Varsnap Status](https://www.varsnap.com/user/daf7b93f-52fe-488a-b11c-d60647720a28/varsnap_badge.svg)](https://www.varsnap.com/user/)

This is a base Flask/uWSGI/nginx setup, useful as a skeleton for building
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
 - Includes setting up secure and fast nginx/uwsgi in production
 - Docker support

Setup
-----

Modify and run `bin/scaffold.sh` to create a copy of base-flask for your
project needs, then run `bin/setup.sh` to set up the host.

Base-flask is designed to work with a minimally sized [AWS EC2](https://aws.amazon.com/ec2/instance-types/)
or [DigitalOcean](https://www.digitalocean.com/pricing/)
instance, running a modern version of Ubuntu (20.04 LTS recommended).

### CDN

A CDN like [cloudflare](https://www.cloudflare.com/) can also be added on to boost
speed.  A good cloudflare setup would be to use full SSL encryption and to
install an origin certificate so that requests are encrypted end-to-end.

Development
-----------

### Setup (using [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)):

```bash
mkvirtualenv app -p python3.9
pip install -r requirements.txt
pip install -r requirements-test.txt
ln -s .env.development .env
npm install

# Install shellcheck
# brew install shellcheck
# sudo apt-get install shellcheck

```

### Spinning up the server:

```bash
npm run minify
python app/serve.py
```

### Running tests:

```bash
bin/test.sh
```

### Building and starting the docker container

```bash
docker build -t $PROJECT_NAME:test .
docker run -t -i -p 127.0.0.1:$INTERNAL_PORT:$INTERNAL_PORT $PROJECT_NAME:test
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
