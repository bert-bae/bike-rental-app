# [TakeAndRide] Starting the Project

## Local Development

#### Backend

_Setting up dependencies_:

1. Install docker and necessary dependencies to run docker-compose.
2. Install the dependencies by running `npm i`
3. Install the sequelize-cli by running `npm install -g sequelize-cli`
4. Copy the contents of `.env.template` file to a new `.env` file.

_Setup the database_:

1. In `backend` folder, run `sequelize db:migrate` to generate the tables and models.
2. [For Development] Seed the data with one manager user and fake bikes by running `sequelize db:seed:all`

_Run the server_:

1. Instantiate the postgres docker image:

- `cd backend/`
- `docker-compose up` OR `sudo docker-compose up`

2. Run the application by running `npm run start`
