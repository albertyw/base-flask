FROM node:25-slim AS node
ARG GIT_VERSION="master"
ENV GIT_VERSION=$GIT_VERSION
ARG GIT_BRANCH="master"
ENV GIT_BRANCH=$GIT_BRANCH
WORKDIR /root
COPY . /root
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install dependencies and build static files
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates                        `: Needed for installing dependencies` \
    && rm -rf /var/lib/apt/lists/*
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN pnpm install --prod --frozen-lockfile \
    && pnpm run build:prod


FROM python:3.14-slim-trixie

LABEL maintainer="git@albertyw.com"
EXPOSE 5000
HEALTHCHECK --interval=5s --timeout=3s CMD bin/healthcheck.sh || exit 1
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set locale
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl locales                                `: Basic-packages` \
    supervisor                                  `: Runnning python in daemon mode` \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# Set up directory structures
WORKDIR /var/www/app
RUN mkdir -p .
COPY . .

# Set up dependencies
RUN pip install --no-cache-dir -e .
COPY --from=node /root/static/gen ./static/gen

# Set startup script
CMD ["bin/start.sh"]
