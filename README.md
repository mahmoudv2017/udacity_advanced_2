# Storefront Backend Project

# Create a new USER

1. CREATE USER mahmoudv2023 WITH PASSWORD 'vcut2023';

# create the database

1. CREATE DATABASE udacity_test;
2. CREATE DATABASE udacity;
3. GRANT ALL PRIVILEGES ON DATABASE UDACITY to mahmoudv2023;
4. GRANT ALL PRIVILEGES ON DATABASE udacity_test to mahmoudv2023;
5. npm install db-migrate -g
6. db-migrate up


# you .env should look like this
{
    host = 127.0.0.1
    user = mahmoudv2023
    password = vcut2023
    database= udacity
    database_test= udacity
    ENV=dev
    PORT = 5432
    pepper="my personal pepper"
    SALT_ROUNDS = 10
    SECRET = "vcut2023"
}

## To Start the Project
1. npm install
2. npm start
3. the server will be hosted on PORT = 3000 by default
4. Database Will be Hosted on PORT = 5432 by Default

