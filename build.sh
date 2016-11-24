python manage.py db makemigrations bucketlistapi
python manage.py db migrate
gunicorn bi.wsgi:app 