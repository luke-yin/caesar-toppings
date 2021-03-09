const express = require('express');
const router = express.Router();

//query functions
const { getItems } = require('../db/items_queries')

module.exports = (db) => {

  router.get("/", (req, res) => {
  const userId = req.session.userId; //TODO **** add user through req.session.userId
  const userName = req.session.userName; 

  if (!userId) {
  res.redirect('/login');
  return
  };
  getItems()
  .then(data => {
      const items = data.rows;
      //  res.json({ items });
      const templateVars = {
        items,
        user: userName 
      }
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
