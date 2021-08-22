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
-   To only start mongoDB run `cd docker` then `docker-compose up` 
    -   You can then reach the mongo-express GUI from `http://localhost:PORT/`
-   To start client run `cd client` then `npm start`
-   To start server run `cd server` then `npm run server`
-   To run in docker run `docker-compose up --build`

### ENV
To run this application you need a `.env` file in the root containing\
The env file in root is used for configure docker-compose\
`MONGO_EXPRESS_PORT=PORT FOR MONGO GUI`\
`DATABASE_USERNAME=DATABASE USERNAME`\
`DATABASE_PASSWORD=DATABASE PASSWORD`\
`EXPRESS_USERNAME=GUI USERNAME`\
`EXPRESS_PASSWORD=GUI PASSWORD`\

We need a `.env` file in the server folder containing\
The env file in root is used for configure the server\
`PORT=PORT TO RUN THE SERVER`\
`DATABASE_USERNAME=DATABASE USERNAME` **Note that this should be the same as in the root folder**\
`DATABASE_PASSWORD=DATABASE PASSWORD` **Note that this should be the same as in the root folder**\
`DATABASE_DOMAIN=mongodb://DOMAIN/DATABASE`\
`JWT_SECRET=SUPER SECRET FOR JWT`\
`JWT_EXPIRE=TIME FOR JWT TO BE VALID`\
`PASSWORD_RESET_URL=URL TO THE FRONTEND PAGE FOR PASSWORD RESET`\

We need a `.env` file in the client folder containing\
The env file in root is used for configure the client\
`REACT_APP_BASE_URL=BASE URL FOR BACKEND`\