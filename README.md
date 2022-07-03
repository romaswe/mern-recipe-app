# README

This is a MERN stack to create a recipe app
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

-   MongoDB - document database
-   Express(.js) - Node.js web framework
-   React(.js) - a client-side JavaScript framework
-   Node(.js) - the premier JavaScript web server

### Functionality

-   Login
-   Personal shopping lists
-   Add ingredients to shopping list from recipes
-   Adding new recipes

### How do I get set up?

## For DEV

-   To start mongoDB run `cd docker` then `docker-compose up`
    -   You can then reach the mongo-express GUI from `http://localhost:PORT/`
-   To start client run `cd client` then `npm start`
-   To start server run `cd server` then `npm run server`

## For PROD

To run a deployd version of the app you should only need to run the docker compose with the command `docker-compose up --build` from root folder (`MERN-RECIPE-APP`)
This will start MONGO, Server Client and run it in NGINX.  
The app should now be reached on `http://localhost/`

### ENV

To run this application you need a `.env` file in the **root** containing.
The env file in **root** is used for configure docker-compose.  
`MONGO_EXPRESS_PORT=PORT FOR MONGO GUI`  
`DATABASE_USERNAME=DATABASE USERNAME`  
`DATABASE_PASSWORD=DATABASE PASSWORD`  
`EXPRESS_USERNAME=GUI USERNAME`  
`EXPRESS_PASSWORD=GUI PASSWORD`

We need a `.env` file in the **server** folder containing.
The env file in **server** is used for configure the server.  
`PORT=PORT TO RUN THE SERVER`  
`DATABASE_USERNAME=DATABASE USERNAME` **Note that this should be the same as in the root folder**  
`DATABASE_PASSWORD=DATABASE PASSWORD` **Note that this should be the same as in the root folder**  
`DATABASE_DOMAIN=mongodb://DOMAIN/DATABASE`  
`JWT_SECRET=SUPER SECRET FOR JWT`  
`JWT_EXPIRE=TIME FOR JWT TO BE VALID`  
`PASSWORD_RESET_URL=URL TO THE FRONTEND PAGE FOR PASSWORD RESET`

We need a `.env` file in the **client** folder containing.
The env file in **client** is used for configure the client.  
`REACT_APP_VERSION=APPLICATION VERSION`  
`REACT_APP_LOGROCKET=LOGROCKET APP ID`  
`REACT_APP_ENVIROMENT=ENVIROMENT`  
`REACT_APP_HOMEPAGE_URL=URL TO HOMEPAGE`

# To fix:

-   [x] When creating a user you can pass roles and create a admin
-   [x] Add week recipes where theres a recipes with similar ingredients
    -   [x] Frontend
    -   [x] Backend
-   [x] Unclutter adminsite, add buttons to hide/show segments
-   [x] Add delete recipes
-   [ ] Add delete group recipes
-   [ ] Add confirmation before delete recipes
-   [ ] Fix swagger so arguments/body are correct
-   [ ] Add foodbox QR ide to the website
-   [ ] Fix docker image for frontend
-   [ ] Fix docker image for backend
-   [ ] Fix compose that runs images above
-   [ ] Add new roles to make handle so user can add recipes
-   [ ] Be able to edit recipes
-   [ ] Add local support
    -   [ ] SE
-   [ ] Search, add so you can search for recipes
-   [ ] Search group recipes
-   [ ] Improve groceries list
    -   [ ] Add quantity to items
    -   [ ] Name lists and have multiple lists
-   [ ] Redesign frontend
    -   [ ] List recipes
    -   [ ] Recipes page (public)
    -   [ ] Groceries
    -   [ ] Admin
    -   [ ] About page
