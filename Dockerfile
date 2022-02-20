FROM python:3.10-bullseye

LABEL maintainer="git@albertyw.com"
EXPOSE 5000
HEALTHCHECK --interval=5s --timeout=3s CMD bin/healthcheck.sh || exit 1
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set locale
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV DEBIAN_FRONTEND noninteractive

# Install dependencies
RUN curl https://deb.nodesource.com/setup_16.x | bash \
    && apt-get update && apt-get install -y --no-install-recommends \
    locales                                     `: Basic-packages` \
    supervisor                                  `: Runnning python in daemon mode` \
    logrotate                                   `: Rotate logs because uWSGI has bugs` \
    nodejs                                      `: Javascript assets` \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# Set up directory structures
RUN mkdir -p /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app

# Set up dependencies
RUN pip install --no-cache-dir -r requirements.txt \
    && npm ci --only=production \
    && cp config/logrotate /etc/logrotate.d/uwsgi

# Set startup script
CMD ["bin/start.sh"]
