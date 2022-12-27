import multiprocessing


wsgi_app = 'app.serve:app'

bind = '0.0.0.0:5000'
workers = multiprocessing.cpu_count() * 2 + 1
preload_app = True

max_requests = 5000
max_requests_jitter = 1000
