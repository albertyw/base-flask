import os

from flask import Flask, render_template, got_request_exception
from flask_assets import Environment, Bundle
from flask_sitemap import Sitemap

from routes import handlers

import dotenv
from getenv import env
root_path = os.path.dirname(os.path.realpath(__file__)) + '/../'
dotenv.read_dotenv(os.path.join(root_path, '.env'))


app = Flask(__name__)
app.debug = env('DEBUG') == 'true'
app.config['SERVER_NAME'] = env('SERVER_NAME')

app.config['SITEMAP_INCLUDE_RULES_WITHOUT_PARAMS'] = True
app.config['SITEMAP_URL_SCHEME'] = 'https'
assets = Environment(app)
ext = Sitemap(app=app)


js = Bundle(
    'js/jquery.js',
    'js/tether.js',
    'js/bootstrap.js',
    'js/global.js',
    filters='rjsmin', output='gen/bundle.min.js'
)
assets.register('js_all', js)
css = Bundle(
    'css/normalize.css',
    'css/tether.css',
    'css/bootstrap.css',
    'css/global.css',
    filters='cssmin', output='gen/bundle.min.css'
)
assets.register('css_all', css)

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
    envs['ENV'] = env('ENV')
    return {'ENV': envs}


app.register_blueprint(handlers)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.htm"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0")
