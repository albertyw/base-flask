# Base Flask Setup

[ ![Codeship Status for albertyw/base-flask](https://codeship.com/projects/7a732790-5535-0134-49ab-4625866fb5c2/status?branch=master)](https://codeship.com/projects/172030)
[![Dependency Status](https://gemnasium.com/badges/github.com/albertyw/base-flask.svg)](https://gemnasium.com/github.com/albertyw/base-flask)
[![Code Climate](https://codeclimate.com/github/albertyw/base-flask/badges/gpa.svg)](https://codeclimate.com/github/albertyw/base-flask)
[![Test Coverage](https://codeclimate.com/github/albertyw/base-flask/badges/coverage.svg)](https://codeclimate.com/github/albertyw/base-flask/coverage)
[![Hound CI](https://img.shields.io/badge/houndci-monitored-blue.svg)](https://houndci.com/)

Base Flask/uWSGI/nginx setup

Development
-----------

With virtualenvwrapper:
```
mkvirtualenv app -p python3.5
pip install -r requirements.txt
python app/serve.py
```

Testing
-------

```
cd app
coverage run -m unittest discover
```
