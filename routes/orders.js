const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    
    if (!userId) {
      res.redirect('/login');
      return
      };
  });

  router.post("/", (req, res) => {
   
  });

  return router;
};