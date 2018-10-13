import os

from flask import Flask, render_template, got_request_exception
from flask_assets import Environment, Bundle
from flask_sitemap import Sitemap
from syspath import git_root

from app.routes import handlers

import dotenv
dotenv.load_dotenv(os.path.join(git_root.path, '.env'))


app = Flask(__name__)
app.debug = os.environ['DEBUG'] == 'true'
if os.environ.get('SERVER_NAME', ''):  # pragma: no cover
    app.config['SERVER_NAME'] = os.environ['SERVER_NAME']

app.config['SITEMAP_INCLUDE_RULES_WITHOUT_PARAMS'] = True
app.config['SITEMAP_URL_SCHEME'] = 'https'
assets = Environment(app)
ext = Sitemap(app=app)


js = Bundle(
    'js/jquery.js',
    'js/bootstrap.js',
    'js/global.js',
    filters='rjsmin', output='gen/bundle.min.js'
)
assets.register('js_all', js)
css = Bundle(
    'css/normalize.css',
    'css/bootstrap.css',
    'css/global.css',
    filters='pyscss', output='gen/bundle.min.css'
)
assets.register('css_all', css)

if os.environ['ENV'] == 'production':
    import rollbar
    import rollbar.contrib.flask

    @app.before_first_request
    def init_rollbar():
        """init rollbar module"""
        rollbar.init(
            os.environ['ROLLBAR_SERVER_TOKEN'],
            # environment name
            os.environ['ENV'],
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
    envs['ROLLBAR_CLIENT_TOKEN'] = os.environ['ROLLBAR_CLIENT_TOKEN']
    envs['SEGMENT_TOKEN'] = os.environ['SEGMENT_TOKEN']
    envs['ENV'] = os.environ['ENV']
    envs['LOGFIT_CLIENT_TOKEN'] = os.environ['LOGFIT_CLIENT_TOKEN']
    return {'ENV': envs}


app.register_blueprint(handlers)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.htm"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0")
