from flask import Blueprint, render_template
from typing import Any

from varsnap import varsnap


handlers = Blueprint('handlers', __name__)


@handlers.route("/")
@varsnap
def index() -> Any:
    return render_template("index.htm")
