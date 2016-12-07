
[![Build Status](https://travis-ci.org/andela-dmigwi/be-informed-b4-life-ends.svg?branch=ft-rest-implementation)](https://travis-ci.org/andela-dmigwi/be-informed-b4-life-ends)
[![Coverage Status](https://coveralls.io/repos/github/andela-dmigwi/be-informed-b4-life-ends/badge.svg?branch=ft-rest-implementation)](https://coveralls.io/github/andela-dmigwi/be-informed-b4-life-ends?branch=ft-rest-implementation)
[![CircleCI](https://circleci.com/gh/andela-dmigwi/be-informed-b4-life-ends/tree/ft-rest-implementation.svg?style=svg)](https://circleci.com/gh/andela-dmigwi/be-informed-b4-life-ends/tree/ft-rest-implementation)

### [Be Informed B4 Life Ends]

*Life Is Too Short, Be Informed Of Its Wonders Before It Ends.*

Live BucketList Backend: https://dj-bucketlist.herokuapp.com

This a bucketlist repo that contains an api built in Django REstful and Frontend in angular js

| **Functionality** | **Method** | **Route** |
|:---------------------------------:|:------:|:---------------------------------------------------:|
| Logs a user in | POST | `/api/v1/auth/login` |
| Register a user | POST | `/api/v1/auth/register` |
| Create a new bucket list | POST | `/api/v1/bucketlists` |
| List all the created bucket lists | GET | `/api/v1/bucketlists/int:id` |
| Get single bucket list | GET | `/api/v1/bucketlists/int:id` |
| Update this bucket list | PUT | `/api/v1/bucketlists/int:id` |
| Delete this single bucket list | DELETE | `/api/v1/bucketlists/int:id` |
| Create a bucket list item | POST | `/api/v1/bucketlists/int:id/items` |
| Update a bucket list item | PUT | `/api/v1/bucketlists/int:id/items/int:id` |
| Delete a bucket list item | DELETE | `/api/v1/bucketlists/int:id/items/int:id` |

### [Be Informed B4 Life Ends] Project Setup

-  **Installation:**
            1. Create a virtual environment by running the command.
            ``virtualenv --python=python3 venv-django``

            2. Activate the virtualenv by running
            ``source venv-django/bin/activate``

-  **Clone the repo**            
            ``git clone -b develop https://github.com/andela-dmigwi/be-informed-b4-life-ends.git``

- **Database setup**
By Default the system uses an sqlite3 database whose configuration is in the settings.py file.

--To add a Custom database:--
Create a `local_settings.py` file in the same folder as `settings.py`:

        ``DATABASES = {
            'default': {
                'ENGINE':   'django.db.backends.postgresql',
                'NAME':     'your-database-name-here',
                'USER':     'your-database-user-here',
                'PASSWORD': 'your-database-password-here',
                'HOST':  'your-database-host-here',
                'TEST': {'CHARSET': 'UTF8'}
            }
        }``


To set up the database, Run the following commands:
           1. ``python manage.py db migrate``
           
- **Launch the system**
Run the following commands:
            1. ``python manage.py runserver``

- **Run Tests**
Run : 
            1. ``python manage.py test``


### Register a User
This section allows a new user to be created:

            **Content-Type**: ``application/json``  
            **Valid Input**: ``{"username":"user1", "password":"pass1"}``


### Login
This section allows a user to login:

            **Content-Type**: ``application/json``
            **Valid Input**: ``{"username":"user1", "password":"pass1"}``


### Create a New Bucket List
This section allows a new bucket list to be created:

            **Authorization**: ``Token <your-token>``
            **Content-Type**: ``application/json`` 
            **Valid Input**:  ``{"name": "BucketList 1"}``


### List all created bucket lists
This section allows all bucket list to be retrieved:

            **Authorization**: ``Token <your-token>``

### Get Single bucket list
This section allows a retreiving of a single bucket list:

            **Authorization**: ``Token <your-token>``


### Update this bucket list
This section allows a new user to be created:

            **Authorization**: ``Token <your-token>``
            **Content-Type**: ``application/json``
            **Valid input**: ``{"name": "edited bucketlist"}``


### Delete this single bucket list
This section allows a single bucket list to be deleted:

            **Authorization**: ``Token <your-token>``

### Create a bucket list item
This section allows a new bucket list item to be created:

            **Authorization**: ``Token <your-token>``
            **Content-Type**: ``application/json``
            **Valid input**: ``{"name":" new item"}``

 
### Update a bucket list item
This section allows a bucket list item to be updated:

            **Authorization**: ``Token <your-token>``
            **Content-Type**: ``application/json``
            **Valid input**: ``{"name":" editted"}`` or ``{"name":"edit", "done":true}``
 

### Delete a bucket list item
This section allows a bucket list to be deleted:

            **Authorization**: ``Token <your-token>``


### Logout
This section allows a user to exit the system whereby his current password is inavalidated: To login again the user generate a new token.

            **Content-Type**: ``application/json``
            **Valid Input**: ``{"username":"user1", "password":"pass1"}``

### Paginate
Works by providing a limit paramater that specify the number of items that should be retrieved. By default pagination with 10 Bucketlists page is done and a maximum of 100 Bucketlists per page is allowed.
Customization is allowed by setting the following values in the query parameters.    
    
    'page_size'  # client overrides, by`?page_size=xxx`
    
    .Request
    GET http://localhost:5555/api/v1/bucketlists?page_size=20&page=1 (gets first 20 bucketlists)

Created BY [MIGWI NDUNG'U](https://github.com/andela-dmigwi/be-informed-b4-life-ends) @2016
