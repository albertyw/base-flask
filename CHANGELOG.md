CHANGELOG
=========

3.3.0
-----

 - Add docker networking
 - Cleanup shell scripts
 - Update dependencies


3.2.3
-----

 - Fix permissions on log files
 - Fix removing nonexistent docker containers
 - Clean up error suppress in deployment script (thanks @cdlewis)
 - Update dependencies


3.2.2
-----

 - Fix container pruning during deployment
 - Export logs from container into host


3.2.1
-----

 - Make deployments prune only containers older than 14 days
 - Updated dependencies


3.2.0
-----

 - Updated to bootstrap 4.1.3
 - Updated normalize.css to v8.0.1


3.1.0
-----

 - Clarify nginx config directory naming
 - Serve static files directly from nginx


3.0.5
-----

 - Make deployment script able to run outside of production
 - Dependency updates


3.0.4
-----

 - Bust caches with networking
 - Turn off host networking

3.0.3
-----

 - Clean up bin scripts
 - Remove tether and update normalize.css


3.0.2
-----

 - Removed unused python autoreload with uwsgi
 - Fixed flag for docker pruning images
 - Make docker container use host networking for communicating out of the container
 - Dependency updates


3.0.1
-----

 - Update dependencies
 - Optimizations to docker builds
 - Make deploy script work from any directory
 - Parameterize ports


3.0.0
-----

 - Add docker support


2.4.2
-----

 - Update dependencies


2.4.1
-----

 - Update syspath
 - Simplify path setup for development, test, and production environments


2.4.0
-----

 - Install and integrate syspath
 - Make tests be able to run from any directory
 - Modernize up setup.sh commands
 - Update dependencies


2.3.0
-----

 - Add logfit.js
 - Move template includes into subdirectory
 - Make launching server in development not depend on server name


2.2.0
-----

 - Switch from cssmin to pyscss
 - Add mypy
 - Dependency updates


2.1.4
-----

 - Switch from gemnasium to pyup


2.1.3
-----

 - Update python packages
 - Update rollbar.js


2.1.2
-----

 - Update python packages


2.1.1
-----

 - Update python packages
 - Update js packages


v2.1.0
------

 - Replace django-dotenv with python-dotenv
 - Update dependencies


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
