from flask import Blueprint, render_template
from typing import Any

handlers = Blueprint('handlers', __name__)


@handlers.route("/")
def index() -> Any:
    return render_template("index.htm")
