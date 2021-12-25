from syspath import git_root
import dotenv


dotenv.load_dotenv(git_root.path / '.env')
