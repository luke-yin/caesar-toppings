const express = require("express");
const router = express.Router();
const { getOrderId, createOrder } = require('../db/items_queries')


module.exports = (db) => {
  router.get("/", (req, res) => {
    //hardcoded user for Demo purposes
    let userId = 'Sori Han';

    if (!userId) {
      const templateVars = {
        user: null,
      };
      res.render("login", templateVars);
      return;
    }
    res.redirect("/items");
  });

  router.post("/", (req, res) => {
    const userName = req.body.userName; //input = sori han
    const userId = 1;
    const status = "precheckout";

 
    getOrderId(userID)
    .then((res) => {
        //If an order is already in progress for that user
        if (res) {
          res.redirect("/items");
          return;
        }
    //If an order is not in progress for that user
    createOrder(userId, status)
    .catch((err) => {
        res.status(500).json({ error: err.message });
    });

    res.redirect("/items");
  });

});
return router;
};
