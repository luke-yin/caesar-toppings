const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //render restaurant page
  });

  router.post("/:orderId", (req, res) => {

   //when they complete the order
  });

  return router;
};
