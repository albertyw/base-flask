import os
import sys

import dotenv
import monitor
import newrelic.agent
from syspath import git_root, get_git_root  # NOQA

root_path = get_git_root()
sys.path.append(os.path.join(root_path, 'app'))
dotenv.load_dotenv(os.path.join(root_path, '.env'))

monitor.start(interval=1.0)

# Set up NewRelic Agent
if os.environ['ENV'] in ['production', 'staging']:
    newrelic_ini = os.path.join(root_path, 'config', 'newrelic.ini')
    newrelic.agent.initialize(newrelic_ini, os.environ['ENV'])

from serve import * # noqa
