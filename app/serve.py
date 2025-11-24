import os
from pathlib import Path

import dotenv
from flask import Flask, Response, got_request_exception, render_template
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


if os.environ['ENV'] == 'production':  # pragma: no cover
    import rollbar
    import rollbar.contrib.flask

    with app.app_context():
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


app.register_blueprint(handlers)


file_cache: dict[str, str] = {}
def cached_send_file(filename: str) -> Response:
    filedata = file_cache.get(filename)
    if not filedata:
        filepath = Path(app.root_path) / str(app.template_folder) / filename
        with open(filepath, 'r') as f:
            filedata = f.read()
        file_cache[filename] = filedata
    response = Response(filedata, mimetype='text/plain')
    return response


@app.route("/robots.txt")
@varsnap
def robots() -> Response:
    return cached_send_file('robots.txt')


@app.route("/.well-known/security.txt")
@varsnap
def security() -> Response:
    return cached_send_file('wellknown/security.txt')


@app.route("/humans.txt")
@varsnap
def humans() -> Response:
    return cached_send_file('wellknown/humans.txt')


@app.route("/health")
def health() -> Response:
    return Response('{"status": "ok"}', mimetype='text/json')


@app.errorhandler(404)
def page_not_found(e: Exception) -> tuple[str, int]:
    return render_template("404.htm"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0")
