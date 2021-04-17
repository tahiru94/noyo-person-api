# noyo-person-api
An Express based API for Person objects <br><br>

## Prerequisites

This project requires the following to run:

* `node` version `12` / `LTS` or up (`npm` will come installed with this)
* `mongodb` (`mongodb-community`) latest, see relevant install instructions for the following platforms here:
  * [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)
  * [Mac OS X](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  * [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

This project benefits from the following, for testing / API usage purposes:

* MongoDB Compass, linked [here](https://www.mongodb.com/products/compass), used to view the database / collection where the data from the API is stored
* Postman, linked [here](https://www.postman.com/downloads/), to test the API and to send it data / use relevant `CRUD` operations

<br>

## Installation
1. From the main directory, run an `npm install`
2. Generate a file called `.env`, with the `MONGO_URL` variable. For local testing purposes, this can be set to `MONGO_URL=mongodb://localhost`
3. Make sure that MongoDB is running, and is accessible (either locally, or wherever your instance is being run). An easy way to test this is via MongoDB Compass, connecting to the local MongoDB instance for example
4. There are two ways to run the application:
    * `npm run dev` to run the application in development mode
    * `npm run prod` to generate a production build for this project, and run from the `dist/` directory
5. When the application is running, you should see the following message in your CLI: `noyo-person-api running at http://localhost:{PORT}`, where `PORT` has been defaulted to `3000`, but can be changed as needed in the file
6. Refer to the API documentation to learn how to use the different routes