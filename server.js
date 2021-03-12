// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;//***/
const ENV = process.env.ENV || "development";//***/
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
module.exports = db;

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// Separated Routes for each Resource
const itemRoutes = require("./routes/items");
const cartRoutes = require("./routes/cart");
const loginRoutes = require("./routes/login");
const ordersRoutes = require("./routes/orders");
const apiRoutes = require("./routes/api");
const twilioRouter = require("./routes/send-sms.js");

// Mount all resource routes
app.use("/items", itemRoutes(db));
app.use("/cart", cartRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/api", apiRoutes(db));
app.use("/twilio", twilioRouter);



// Note: mount other resources here, using the same pattern above


// Home page
app.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/login");
    return;
  }
  res.redirect("/items");
});

app.post('/logout', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    req.session = null;
    res.redirect("/login");
    return;
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
