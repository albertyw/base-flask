import multiprocessing
import os


proc_name = '$PROJECT_NAME'
wsgi_app = 'app.serve:app'

bind = '0.0.0.0:5000'
# Only the reverse proxy may set X-Forwarded-*.  bin/deploy.sh passes the
# docker bridge gateway, which is the address nginx's traffic arrives from;
# the fallback trusts nobody rather than everybody.
forwarded_allow_ips = os.environ.get('FORWARDED_ALLOW_IPS', '127.0.0.1')
workers = (multiprocessing.cpu_count() // 2) + 1
preload_app = True

accesslog = '/var/www/app/logs/gunicorn/access.log'
errorlog = '/var/www/app/logs/gunicorn/error.log'
access_log_format = (
    '%({x-forwarded-for}i)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" '
    '"%(a)s"'
)

max_requests = 5000
max_requests_jitter = 1000
