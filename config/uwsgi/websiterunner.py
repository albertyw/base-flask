import os

import dotenv
from syspath import git_root

dotenv.load_dotenv(os.path.join(git_root.path, '.env'))

from app.serve import * # noqa
