import os

from flask import Flask, render_template, got_request_exception


import dotenv
root_path = os.path.dirname(os.path.realpath(__file__)) + '/../'
dotenv.read_dotenv(os.path.join(root_path, '.env'))
from getenv import env


app = Flask(__name__)


if env('ENV') == 'production':
    import rollbar
    import rollbar.contrib.flask

    @app.before_first_request
    def init_rollbar():
        """init rollbar module"""
        rollbar.init(
            env('ROLLBAR_SERVER_TOKEN'),
            # environment name
            env('ENV'),
            # server root directory, makes tracebacks prettier
            root=os.path.dirname(os.path.realpath(__file__)),
            # flask already sets up logging
            allow_logging_basic_config=False)

        # send exceptions from `app` to rollbar, using flask's signal system.
        got_request_exception.connect(
            rollbar.contrib.flask.report_exception, app)


@app.context_processor
def inject_envs():
    envs = {}
    envs['ROLLBAR_CLIENT_TOKEN'] = env('ROLLBAR_CLIENT_TOKEN')
    envs['SEGMENT_TOKEN'] = env('SEGMENT_TOKEN')
    return {'ENV': envs}


@app.route("/")
def index():
    return render_template("index.htm")


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")
