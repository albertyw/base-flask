import os
import sys

import dotenv
from getenv import env
import monitor
import newrelic.agent

root_path = os.path.dirname(os.path.realpath(__file__)) + '/../../'
sys.path.append(root_path + '/app/')
dotenv.read_dotenv(os.path.join(root_path, '.env'))

monitor.start(interval=1.0)
# monitor.track(os.path.join(os.path.dirname(__file__), 'site.cf'))

# Set up NewRelic Agent
config_path = root_path + '/config/'
newrelic_ini = '%s/newrelic.ini' % config_path
if env('ENV') in ['production', 'staging']:
    newrelic.agent.initialize(newrelic_ini, env('ENV'))

from serve import * # noqa
