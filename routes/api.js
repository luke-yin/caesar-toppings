const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/items", (req, res) => {
    getItems()
      .then(data => {
        const items = data.rows;
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