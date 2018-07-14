import os

from syspath import git_root
import dotenv


dotenv.load_dotenv(os.path.join(git_root.path, '.env'))
