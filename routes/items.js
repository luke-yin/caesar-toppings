const express = require('express');
const router = express.Router();

//query functions
const { getItems } = require('../db/items_queries')
    
module.exports = (db) => {

  router.get("/", (req, res) => {
const userId = 1; //placeholder for user

  if (!userId) {
  res.redirect('/login');
  return
  };
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
  return router;
}