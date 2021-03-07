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

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
module.exports = db;

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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
// Note: Feel free to replace the example routes below with your own
const cartRoutes = require("./routes/cart");
//const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/cart", cartRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


//queries functions
const { getItems } = require('./db/items_queries')
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  //replaced query with query function /db/items_queries
  getItems()
    .then(data => {
      const items = data.rows;
      //  res.json({ items });
      const templateVars = { items }
      res.render('index', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


app.get('/login/', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

app.post('/login/', (req, res) => {

});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
