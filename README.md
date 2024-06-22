# README

This is a MERN stack to create a recipe app.  
MERN stands for MongoDB, Express, React, and Node, after the four key technologies that make up the stack.

-   MongoDB - document database
-   Express(.js) - Node.js web framework
-   React(.js) - A client-side JavaScript framework
-   Node(.js) - The premier JavaScript web server

### Functionality

-   Login
-   Personal shopping lists
-   Add ingredients to shopping list from recipes
-   Add new recipes

### How do I get set up?

## For DEV

-   To start MongoDB, run `cd docker` then `docker-compose up`.
    -   You can then reach the Mongo Express GUI at `http://localhost:PORT/`.
-   To start the client, run `cd client` then `npm start`.
-   To start the server, run `cd server` then `npm run server`.
    -   You can then reach the Swagger GUI at `http://localhost:PORT/api-docs/`.

## For PROD

To run a deployed version of the app, you should only need to run the Docker Compose with the command `docker-compose up --build` from the root folder (`MERN-RECIPE-APP`).  
This will start Mongo, Server, Client, and run it in NGINX.  
The app should now be reachable at `http://localhost/`.

### ENV

To run this application, you need a `.env` file in the **docker** folder containing:  
The env file in **root** is used to configure docker-compose.  
`MONGO_EXPRESS_PORT=PORT FOR MONGO GUI`  
`DATABASE_USERNAME=DATABASE USERNAME`  
`DATABASE_PASSWORD=DATABASE PASSWORD`  
`EXPRESS_USERNAME=GUI USERNAME`  
`EXPRESS_PASSWORD=GUI PASSWORD`

We need a `.env` file in the **server** folder containing:  
The env file in **server** is used to configure the server.  
`PORT=PORT TO RUN THE SERVER`  
`DATABASE_USERNAME=DATABASE USERNAME` **Note that this should be the same as in the docker folder**  
`DATABASE_PASSWORD=DATABASE PASSWORD` **Note that this should be the same as in the docker folder**  
`DATABASE_NAME=DATABASE NAME`  
`DATABASE_DOMAIN=mongodb://DOMAIN/DATABASE`  
`JWT_SECRET=SUPER SECRET FOR JWT`  
`JWT_EXPIRE=TIME FOR JWT TO BE VALID`  
`PASSWORD_RESET_URL=URL TO THE FRONTEND PAGE FOR PASSWORD RESET`  
`ADMIN_USERNAME=admin`  
`ADMIN_EMAIL=admin@admin.com`  
`ADMIN_PASSWORD=adminadmin`  
`CREATE_MOCK_DATA=true`

We need a `.env` file in the **client** folder containing:  
The env file in **client** is used to configure the client.  
`APP_VERSION=APPLICATION VERSION`  
`APP_LOGROCKET=LOGROCKET APP ID`  
`APP_ENVIRONMENT=ENVIRONMENT`  
`APP_HOMEPAGE_URL=URL TO HOMEPAGE`

# To fix:

-   [x] When creating a user, you can pass roles and create an admin
-   [x] Add week recipes where there's a recipe with similar ingredients
    -   [x] Frontend
    -   [x] Backend
-   [x] Unclutter admin site, add buttons to hide/show segments
-   [x] Add delete recipes
-   [x] Add delete group recipes
-   [ ] Add confirmation before deleting recipes and group recipes
-   [ ] Fix Swagger so arguments/body are correct
-   [ ] Add foodbox QR code to the website
-   [ ] Fix Docker image for frontend
-   [ ] Fix Docker image for backend
-   [ ] Fix compose that runs images above
-   [ ] Change role handling
    -   [ ] Array of roles
    -   [ ] Each function is a role
-   [ ] Be able to edit recipes
-   [ ] Add local support
    -   [ ] SE
    -   [ ] ENG
-   [ ] Search
    -   [ ] Add so you can search for recipes
    -   [ ] Search group of recipes
-   [ ] Improve groceries list
    -   [ ] Add quantity to items
    -   [ ] Name lists and have multiple lists
-   [ ] Redesign frontend
    -   [ ] List recipes
    -   [ ] Recipes page (public)
    -   [ ] Groceries
    -   [ ] Admin
    -   [ ] About page
-   [ ] Add web scraping support
    -   [ ] Ica
    -   [ ] Coop
    -   [ ] GUI
-   [ ] Meal prep
    -   [ ] Plan week of recipes
-   [ ] Suggestion of recipes using similar ingredients
-   [ ] Frontend 2.0 (1.0 is just a POC and full of bugs)
