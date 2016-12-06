python manage.py makemigrations bucketlistapi
python manage.py migrate
gunicorn bi.wsgi --log-file - 

