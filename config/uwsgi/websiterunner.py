import dotenv
from syspath import git_root

dotenv.load_dotenv(git_root.path / '.env')

from app.serve import * # noqa
