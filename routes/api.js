const express = require("express");
const router = express.Router();
const { getAllItems } = require('../db/items_queries');


module.exports = (db) => {
  router.get("/items", (req, res) => {
    getAllItems()
      .then(items => {
        res.json({ items });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
