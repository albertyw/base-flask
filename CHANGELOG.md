CHANGELOG
=========

v2.0.2
------

 - Flake8 fixes


v2.0.1
------

 - Update dependencies


v2.0.0
------

 - Removed django-getenv dependency
 - Disable uWSGI autoreload
 - Back to 100% test coverage
 - Updated packages


v1.7.0
------

 - Add 404 handler
 - Split out handlers to separate file
 - Updates to dependencies
 - README updates


v1.6.3
------

 - Updates to dependencies
 - Fixes for uwsgi service setup
 - Updates to CI setup and documentation


v1.6.2
------

 - Various fixes for multitenancy, uwsgi configs, and scaffolding


v1.6.1
------

 - Fix unupdated uwsgi service name


v1.6.0
------

 - Update deployment config and log files to support multiple base-flask
   apps running on the same server
 - Update newrelic package


v1.5.0
------

 - Add script to scaffold new project
 - Better documentation
 - Better setup script and deploy scripts
 - Fixed all codeclimate issues


v1.4.1
------

 - Update normalize, rollbar, and jquery to latest versions
 - Use unminified js and css for bundling
 - Update newrelic package


v1.4.0
------

 - Update python packages
 - Simplify nginx/uwsgi setup
 - Bugfix for uwsgi systemctl config


v1.3.0
------

 - Update setup to support running on AWS Ubuntu 16.04 Xenial
 - Switch from upstart to systemd for uwsgi


v1.2.3
------

 - Remove some unused code
 - Update dependencies


v1.2.2
------

 - Update dependencies


v1.2.1
------

 - Minor fixes


v1.2.0
------

 - Update bootstrap, tether, jquery, and normalize to latest versions


v1.1.0
------

 - Update rollbar package
 - Merge CSS and Javascript files


v1.0.0
------

 - First stable release
 - Includes standard website sitemap.xml and robots.txt files
 - 100% test coverage
 - No code climate issues
 - Documented setup/usage procedures
