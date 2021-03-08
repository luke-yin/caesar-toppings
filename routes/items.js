const express = require('express');
const router = express.Router();

//query functions
const { getItems } = require('../db/items_queries')
    
//const { addItem } = require('../db/items_queries')

module.exports = (db) => {

  router.post("/", (req, res) => {
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