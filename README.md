# [TakeAndRide] Starting the Project

## Local Development

The TakeAndRide bike rental application is built with typescript end to end. The project requires MapBox to get the map and search by map position working.

This is a demo and further considerations should be made for full production usability such as:

- Testing
- Notifications
- Proper error handling
- Proper UI / UX design

#### Backend

_Setting up dependencies_:

1. Install docker and necessary dependencies to run docker-compose.
2. Install the dependencies by running `npm i` in `/backend` and `/frontend`
3. Install the sequelize-cli by running `npm install -g sequelize-cli`
4. Copy the contents of `.env.template` file to a new `.env` file.

_Setup the database_:

1. Start the database using docker-compose:

- `cd backend/`
- `docker-compose up` OR `sudo docker-compose up`

2. In `backend` folder, run `sequelize db:migrate` to generate the tables and models.
3. [For Development] Seed the data with one admin user and fake bikes by running `sequelize db:seed:all`
4. [For Development] An administrative user is created as a part of the `seed` with these credentials:

- username: `superadmin`
- password: `password`

_Run the server_:

1. Start the database if it is not running:

- `cd backend/`
- `docker-compose up` OR `sudo docker-compose up`

2. Copy the `/backend` env file `.env.template` to `.env`
3. Run the application by running `npm run start`

_Run the react app_:

1. Copy the `/frontend` env file `.env.template` to `.env`
2. Go to `https://www.mapbox.com/` to create an account and retrieve a public key for the map functionality.
3. Run `npm run start`
