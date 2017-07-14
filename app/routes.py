from flask import Blueprint, render_template


handlers = Blueprint('handlers', __name__)


@handlers.route("/")
def index():
    return render_template("index.htm")


@handlers.route("/robots.txt")
def robots():
    return render_template("robots.txt")
