# PHE HAY End User Frontend

<!-- vim-markdown-toc GitLab -->

* [Purpose of this app](#purpose-of-this-app)
* [About this application](#about-this-application)
* [Getting Started](#getting-started)
  * [Running the development server](#running-the-development-server)
  * [Adding new dependencies](#adding-new-dependencies)
  * [Rebuilding development DB docker image](#rebuilding-development-db-docker-image)
* [Super admin user](#super-admin-user)
* [Environment variables](#environment-variables)
* [SQL Server Adaptations](#sql-server-adaptations)
  * [docker-compose.yml](#docker-composeyml)
  * [requirements.txt](#requirementstxt)
  * [settings.py](#settingspy)

<!-- vim-markdown-toc -->


## Purpose of this app


The purpose of this app is to provide a CMS and API for handling read/write of data to the database and server the required information to the frontend.


It is also to provide a user interface for admin users to maintain the 'One You' site.


## About this application


This application is based on the Wagtail CMS.

## Getting Started


### Running the development server

You have two options to run the development server:

**1.** from the root directory of the project run:

```
./bin/buildbackend
./bin/runbackend
```

**2.** from the root directory of the backend run:
   
```
docker-compose build
docker-compose up
```

For either option:

The first command builds the docker image for the backend to run in.
The second command starts the docker container for the backend and the database, the CMW will running on port 8000.
  
  
### Adding new dependencies

Adding a new dependency requires rebuilding docker image for Django app if you are working with Docker. After installing dependency with `pip install <dependency>` run following to update requirements.txt

```
pip freeze > requirements.txt
```

Stop docker containers 

```
docker-compose down
```

Rebuild Django app image

```
docker-compose build web
```

Start server again

```
docker-compose up
```


### Rebuilding development DB docker image

Rebuilding the image will purge all previous data and create a fresh db for development. Run following command to do this.

```
docker-compose build db
```


## Super admin user

Running the app the first time it will populate the database with all the data required to run the tool locally, including a user with superuser access to the admin console.

The credentials for the user are:

- username: superadmin
- password: superPassword

You can change the password through the UI as you like.



## Environment variables

| Variable        | Default       | Description                       |
| --------------- | :-----------: | --------------------------        |    
| DB_HOST         | db            | DB host url/string                |
| DB_PORT         | 1433          | DB connection port                |
| DB_NAME         | master        | db name to use                    |
| DB_USER         | sa            | DB user                           |
| DB_PASSWORD     |               | DB password                       |
| HAY_DEBUG       | False(True for docker run in dev)         | Enable Django debug tools and overall debug settings|

## SQL Server Adaptations


### docker-compose.yml

```
-    image: postgres
+    image: "microsoft/mssql-server-linux:2017-latest"
+    environment:
+      SA_PASSWORD: "msSQL_password"
+      ACCEPT_EULA: "Y"
+    ports:
+      - "1433:1433"
```

### requirements.txt

```
- psycopg2
+ django-pyodbc-azure
```

### settings.py

```
-        'ENGINE': 'django.db.backends.postgresql',
-        'NAME': 'postgres',
-        'USER': 'postgres',
-        'HOST': 'db',
-        'PORT': 5432,
+        'NAME': 'hay_dev',
+        'ENGINE': 'sql_server.pyodbc',
+        'HOST': '127.0.0.1',
+        'PORT': '1433',
+        'USER': 'sa',
+        'PASSWORD': 'msSQL_password',
+        'OPTIONS': {
+            'host_is_server': True,
+            'dsn': 'odbc1',
+            'driver': 'ODBC Driver 13 for SQL Server',
+        },
```
