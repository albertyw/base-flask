import os

import dotenv
import newrelic.agent
from syspath import git_root

dotenv.load_dotenv(os.path.join(git_root.path, '.env'))

# Set up NewRelic Agent
if os.environ['ENV'] in ['production', 'staging']:
    newrelic_ini = os.path.join(git_root.path, 'config', 'newrelic.ini')
    newrelic.agent.initialize(newrelic_ini, os.environ['ENV'])

from app.serve import * # noqa
