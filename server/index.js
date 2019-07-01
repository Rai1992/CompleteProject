require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");

const {SERVER_PORT, HEROKU_CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();
const server = require("http").Server(app);
app.use(express.json());

const main_controller = require('./controller/main_controller');

massive(HEROKU_CONNECTION_STRING).then(db => {
  app.set("db", db);
  server.listen(SERVER_PORT, () => {
    console.log(
      `[${SERVER_PORT}] PORT, Massive connected to Heroku`
    );
  });
}).catch(err=>console.log(err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3 
    }
  })
);

app.post('/api/register', main_controller.register);
app.post('/api/login', main_controller.login);
app.post('/api/create-listing', main_controller.createListing);

app.get('/api/get-all-listings', main_controller.grabAllListings);

app.delete('/api/logout', main_controller.logout);
app.delete(`/api/delete-listing/:id`, main_controller.deleteListing)
