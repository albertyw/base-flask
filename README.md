# Base Flask Setup

[ ![Codeship Status for albertyw/base-flask](https://codeship.com/projects/7a732790-5535-0134-49ab-4625866fb5c2/status?branch=master)](https://codeship.com/projects/172030)
[![Updates](https://pyup.io/repos/github/albertyw/base-flask/shield.svg)](https://pyup.io/repos/github/albertyw/base-flask/)
[![Code Climate](https://codeclimate.com/github/albertyw/base-flask/badges/gpa.svg)](https://codeclimate.com/github/albertyw/base-flask)
[![Test Coverage](https://codeclimate.com/github/albertyw/base-flask/badges/coverage.svg)](https://codeclimate.com/github/albertyw/base-flask/coverage)
[![Hound CI](https://img.shields.io/badge/houndci-monitored-blue.svg)](https://houndci.com/)

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

Setup
-----

Modify and run `bin/scaffold.sh` to create a copy of base-flask for your
project needs.

Base-flask is designed to work with a minimally sized [AWS EC2](https://aws.amazon.com/ec2/instance-types/)
or [DigitalOcean](https://www.digitalocean.com/pricing/)
instance, running a modern version of Ubuntu (16.04 LTS recommended).

### CDN

A CDN like [cloudflare](https://www.cloudflare.com/) can also be added on to boost
speed.  A good cloudflare setup would be to use full SSL encryption and to
install an origin certificate so that requests are encrypted end-to-end.

Development
-----------

### Setup (using [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)):

```bash
mkvirtualenv app -p python3.5
pip install -r requirements.txt
pip install -r requirements-test.txt
ln -s .env.development .env
```

### Spinning up the server:

```bash
python app/serve.py
```

### Running tests:

```bash
mypy app --ignore-missing-imports
coverage run -m unittest discover
```

### CI/CD

This repo uses:

```bash
# Switch to python 3
pyenv local 3.5
pip install -r requirements.txt
pip install -r requirements-test.txt
ln -s .env.development .env

# Test
flake8
coverage run -m unittest discover
coverage report
codeclimate-test-reporter

# Deployment
ssh example.com /var/www/website/bin/deploy.sh
```

Production
----------

### Setup

```bash
mkvirtualenv app -p python3.5
pip install -r requirements.txt
ln -s .env.production .env
bin/setup.sh
```

### Deploment

```bash
bin/deploy.sh
```
