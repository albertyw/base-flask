FROM node:18 as node
WORKDIR /
COPY . .
RUN npm ci --only=production \
    && npm run minify


# Need buster for uwsgi builds
FROM python:3.11-buster

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
RUN apt-get update && apt-get install -y --no-install-recommends \
    locales                                     `: Basic-packages` \
    supervisor                                  `: Runnning python in daemon mode` \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# Set up directory structures
WORKDIR /var/www/app
RUN mkdir -p .
COPY . .
COPY --from=node ./static/gen ./static/gen

# Set up dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set startup script
CMD ["bin/start.sh"]
