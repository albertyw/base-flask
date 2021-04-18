"""
This script refreshes production varsnap snaps
"""

import os

from syspath import git_root  # NOQA

from app import serve


os.environ['ENV'] = 'production'
app = serve.app.test_client()
app.get('/')
app.get('/health')
app.get('/robots.txt')
app.get('/asdf')
