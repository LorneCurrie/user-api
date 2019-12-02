# USER API

A simple API setup to play with KNEX and Objection.js

## Running the App

* Run this command in the project root

        mv ./.env_template .env


* Open `.env` and update the ENV Variables.  `DB_HOST` will be `db` when running in Docker compose

* To run the app, run the following command

        docker-compose build
        docker-compose up <-d>
    
  Docker compose will run a migration script when starting up.  

### Endpoint for quick access will be 

GET - `http://127.0.0.1/api/v1/users`  
GET - `http://127.0.0.1/api/v1/users/1`  
POST - `http://127.0.0.1/api/v1/users`  
PUT - `http://127.0.0.1/api/v1/users/1`  
GET - `http://127.0.0.1/health-check`  

## Documents

Swagger Documents can be found in `/docs/swagger`   
Postman Collection can be found in `/docs/postman`


