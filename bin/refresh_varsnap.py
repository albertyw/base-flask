"""
This script refreshes production varsnap snaps
"""

import os
import subprocess
import sys

import requests
import syspath
from syspath import git_root

from app import serve


os.environ['ENV'] = 'production'
app = serve.app.test_client()
app.get('/')
app.get('/health')
app.get('/robots.txt')
app.get('/asdf')
