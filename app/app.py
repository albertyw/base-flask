from flask import Blueprint, render_template


app = Blueprint('app', __name__)


@app.route("/")
def index():
    return render_template("index.htm")


@app.route("/robots.txt")
def robots():
    return render_template("robots.txt")
