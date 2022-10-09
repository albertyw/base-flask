"""
This script refreshes production varsnap snaps
"""

import os

from flask.testing import FlaskClient
from dotenv import dotenv_values
from syspath import git_root  # NOQA

from app import serve


def get_client() -> tuple[FlaskClient, str]:
    config = dotenv_values('.env.production')
    server_name = ''
    if config['SERVER_NAME'] is not None:
        server_name = config['SERVER_NAME']
    base_url = 'https://' + server_name
    os.environ['ENV'] = 'production'
    serve.app.config['SERVER_NAME'] = config['SERVER_NAME']
    client = serve.app.test_client()
    return client, base_url


def generate_snaps(client: FlaskClient, base_url: str) -> None:
    client.get('/', base_url=base_url)
    client.get('/health', base_url=base_url)
    client.get('/humans.txt', base_url=base_url)
    client.get('/robots.txt', base_url=base_url)
    client.get('/.well-known/security.txt', base_url=base_url)
    client.get('/asdf', base_url=base_url)


if __name__ == '__main__':
    client, base_url = get_client()
    generate_snaps(client, base_url)
