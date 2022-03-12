import os
from typing import Any, Dict

import dotenv
from flask import Flask, Response, render_template, got_request_exception
from flask_sitemap import Sitemap
from syspath import get_current_path, git_root
from varsnap import varsnap

from app.routes import handlers


dotenv.load_dotenv(git_root.path / '.env')

app = Flask(
    __name__,
    static_url_path='/static',
    static_folder=git_root.path / 'static',
)
app.debug = os.environ['DEBUG'] == 'true'
if os.environ.get('SERVER_NAME', ''):  # pragma: no cover
    app.config['SERVER_NAME'] = os.environ['SERVER_NAME']

app.config['SITEMAP_INCLUDE_RULES_WITHOUT_PARAMS'] = True
app.config['SITEMAP_URL_SCHEME'] = 'https'
ext = Sitemap(app=app)


if os.environ['ENV'] == 'production':
    import rollbar
    import rollbar.contrib.flask

    @app.before_first_request
    def init_rollbar() -> None:
        """init rollbar module"""
        rollbar.init(
            os.environ['ROLLBAR_SERVER_TOKEN'],
            # environment name
            os.environ['ENV'],
            # server root directory, makes tracebacks prettier
            root=get_current_path(),
            # flask already sets up logging
            allow_logging_basic_config=False)

        # send exceptions from `app` to rollbar, using flask's signal system.
        got_request_exception.connect(
            rollbar.contrib.flask.report_exception, app)


@app.context_processor
def inject_envs() -> Dict[str, Any]:
    envs = {}
    envs['SEGMENT_TOKEN'] = os.environ['SEGMENT_TOKEN']
    return {'ENV': envs}


app.register_blueprint(handlers)


@app.route("/robots.txt")
@varsnap
def robots() -> Any:
    return render_template("robots.txt")


@app.route("/health")
def health() -> Any:
    return Response('{"status": "ok"}', mimetype='text/json')


# https://github.com/pallets/flask/issues/4295
@app.errorhandler(404)
def page_not_found(e: Exception) -> Any:
    return render_template("404.htm"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0")
