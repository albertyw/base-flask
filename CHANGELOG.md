CHANGELOG
=========

3.20.2 (2023-06-18)
-------------------

 - Dockerfile fixes
 - Set up pyproject.toml
 - Update from bullseye to bookworm
 - Dependency updates


3.20.1 (2023-05-27)
-------------------

 - Minify generated css files
 - Remove unneeded node dependencies
 - Update dependencies
 - Various cleanup


3.20.0 (2023-04-26)
-------------------

 - Switch from browserify to webpack
 - Update dependencies


3.19.6 (2023-03-18)
-------------------

 - Switch deployments from appleboy/drone-ssh to albertyw/ssh-client
 - Update dependencies


3.19.5 (2023-01-31)
-------------------

 - Make CI work on arm64
 - Update dependencies


3.19.4 (2023-01-21)
-------------------

 - Fix docker container healthchecks
 - Update dependencies


3.19.3 (2022-12-27)
-------------------

 - Switch from uWSGI to Gunicorn
 - Update dependencies
 - Docker/CI optimizations


3.19.2 (2022-12-24)
-------------------

 - Remove broken logrotate/cron
 - Update dependencies


3.19.1 (2022-11-22)
-------------------

 - Update dependencies
 - Switch to a maintained version of uglifyify


3.19.0 (2022-10-30)
-------------------

 - Update to python 3.11
 - Fix varsnap tests
 - Remove envrc
 - Update dependencies


3.18.0 (2022-10-08)
-------------------

 - Add envrc
 - Update dependencies


3.17.0 (2022-08-28)
-------------------

 - Update dependencies
 - Add a humans.txt
 - Add security.txt
 - Update preconnect optimizations


3.16.0 (2022-07-02)
-------------------

 - Remove Segment
 - Add Google Analytics
 - Downgrade python docker version to fix uWSGI installation
 - Use better python types


3.15.0 (2022-06-25)
-------------------

 - Remove matomo
 - Fix serving files
 - Update to node 18
 - Update dependencies


3.14.6 (2022-04-17)
-------------------

 - Optimize Dockerfile builds
 - Precompile static files
 - Update dependencies


3.14.5 (2022-03-29)
-------------------

 - Refactors
 - Update dependencies


3.14.4 (2022-02-16)
-------------------

 - Optimize docker container
 - Update dependencies


3.14.3 (2022-01-15)
-------------------

 - Simplify supervisor configuration
 - Update dependencies
 - Send git branch name to varsnap during node testing


3.14.2 (2021-12-25)
-------------------

 - Optimize testing and deployments
 - Cleanup
 - Update dependencies


3.14.1 (2021-12-05)
-------------------

 - Optimize npm dependency installation
 - Fix favicon and other html head link
 - Update dependencies


3.14.0 (2021-11-02)
-------------------

 - Update to Python 3.10
 - Update dependencies
 - Update head tags in base html template


3.13.0 (2021-10-30)
-------------------

 - Switch from a ubuntu to python/debian docker base image
 - Simplify and speed up building containers
 - Update html head tags
 - Fix page_not_found varsnap type usage
 - Update dependencies


3.12.0 (2021-10-19)
-------------------

 - Run python typechecks on entire repository
 - Clean up badges
 - Remove csslint
 - Update dependencies


3.11.2 (2021-09-14)
-------------------

 - Separate JS sourcemaps to make loading faster
 - Speed up tests
 - Dependency updates


3.11.1 (2021-07-30)
-------------------

 - Lint nginx config files
 - Remove newrelic integration
 - Update dependencies


3.11.0 (2021-07-18)
-------------------

 - Add Matomo analytics
 - Optimize drone npm installs
 - Update dependencies


3.10.4 (2021-06-21)
-------------------

 - Gracefully restart nginx so there aren't any dropped connections
 - Speed up Drone CI npm installs
 - Dependency updates


3.10.3 (2021-06-05)
-------------------

 - Switch to working with a dockerized nginx


3.10.2 (2021-05-23)
-------------------

 - Update to Flask v2.0.0
 - Fix html templates to work with bootstrap v5.0.0
 - Dependency updates


3.10.1 (2021-05-08)
-------------------

 - Update bootstrap to v5.0.0
 - Remove jquery
 - Dependency updates


3.10.0 (2021-05-02)
-------------------

 - Add favicons
 - Dockerfile optimizations
 - Dependency updates


3.9.2 (2021-04-27)
------------------

 - Fix Dockerfile lint issues and optimize builds


3.9.1 (2021-04-18)
------------------

 - Periodically refresh production varsnap data so they can be tested against
 - Switch from envify to loose-envify for speed benefits


3.9.0 (2021-04-13)
------------------

 - Switch to running js tests in browser
 - Fix node test coverage reporting
 - Add example js function and varsnap test
 - Dependency updates
 - Switch healthcheck endpoint to return proper content type


3.8.2 (2021-04-03)
------------------

 - Integrate varsnap testing into route handlers
 - Update dependencies


3.8.1 (2021-03-28)
------------------

 - Update dependencies
 - Optimize docker builds


3.8.0 (2021-02-17)
------------------

 - Add drone CI config file
 - Update node dependencies


3.7.7 (2021-02-09)
------------------

 - Fix nginx config bugs


3.7.6 (2021-02-06)
------------------

 - Modularize nginx configs
 - Update dependencies


3.7.5 (2021-02-01)
------------------

 - Various nginx config refactors and fixes
 - Stop cleaning up docker objects when deploying non-master branches
 - Update dependencies
 - README updates


3.7.4
-----

 - Update to python 3.9
 - Update minification to search for all CSS files
 - Dependency updates


3.7.3
-----

 - Stop redirecting raw IP address requests
 - Fix logrotate
 - Update dependencies


3.7.2
-----

 - Add docker healthcheck
 - Fix logrotate
 - Update dependencies


3.7.1
-----

 - Move static directory out of app directory
 - Update dependencies


3.7.0
-----

 - Switch to mypy strict mode.  Note that you may need to backfill python type annotations.
 - Update uwsgi logrotate to be a bit smarter
 - Update dependencies


3.6.3
-----
 - Optimization of supervisor and uwsgi configs
 - Updates to dependencies
 - Make uwsgi log correct IP address
 - Rotate and limit uwsgi and supervisor logs


3.6.2
-----

 - Fix broken thirdparty js initializations
 - Fix bug with not correctly separating multiple js appends
 - Fix docker prune
 - Dependency updates


3.6.1
-----

 - Update node and python dependencies
 - Update to ubuntu 20.04
 - Update nginx configs


3.6.0
-----

 - Set up mocha testing
 - Update dependencies


3.5.7
-----

 - Make deploy.sh default to deploying current state of repository
 - Update gitignore for nginx to ignore logrotated files
 - Write nginx logs to both nginx and local log directories
 - Hide contents of .env during deployment
 - Update deps


3.5.6
-----

 - Fix varsnap.js env
 - Write nginx logs to local logs
 - Update deps


3.5.5
-----

 - Fix the version of python and node that are used for operations
 - Don't copy node_modules into docker container


3.5.4
-----

 - Set up hadolint to lint Dockerfiles
 - Refactor Dockerfile
 - Prune some unneeded OS packages
 - Update dependencies


3.5.3
-----

 - Dependency updates
 - Make docker prune strategy more aggressive
 - Add support for description meta tags


3.5.2
-----

 - Fix js naming
 - Add linters for css and js
 - Switch to imported normalize.css


3.5.1
-----

 - Refactor minification to be more extendable
 - Move more js dependencies to npm
 - Various clean and updates


3.5.0
-----

 - Switch js and css to minify with node instead of python
 - Update dependencies


3.4.0
-----

 - Add varsnap.js
 - Update to python 3.8
 - Stop copying logs into docker container
 - Update dependencies
 - Remove deprecated nginx configs


3.3.5
-----

 - Fixes


3.3.4
-----

 - Add node dependency to minify/bundle CSS
 - Update dependencies
 - Clean up docker images on deploy
 - Update varsnap keys


3.3.3
-----

 - Add varsnap
 - Switch from debian to ubuntu
 - Clean up imports
 - Update to python 3.7
 - Update dependencies


3.3.2
-----

 - Update dependencies
 - Refactor robots.txt route out of routes.py
 - Cleanup
 - Forward IP address from nginx
 - Fix scaffolding


3.3.1
-----

 - Update dependencies
 - Update docs to python 3.7


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
