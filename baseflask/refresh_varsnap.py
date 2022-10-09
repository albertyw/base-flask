"""
This script refreshes production varsnap snaps
"""

import os

from dotenv import dotenv_values
from syspath import git_root  # NOQA

from app import serve


config = dotenv_values('.env.production')
base_url = 'https://' + config.get('SERVER_NAME', '')
os.environ['ENV'] = 'production'
serve.app.config['SERVER_NAME'] = config['SERVER_NAME']
app = serve.app.test_client()
app.get('/', base_url=base_url)
app.get('/health', base_url=base_url)
app.get('/humans.txt', base_url=base_url)
app.get('/robots.txt', base_url=base_url)
app.get('/.well-known/security.txt', base_url=base_url)
app.get('/asdf', base_url=base_url)
