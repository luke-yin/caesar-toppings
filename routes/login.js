const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //hardcoded user for Demo purposes
    let userId;

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

    db.query(
      `INSERT INTO orders (user_id, status)
    VALUES (${userId}, ${status})
    RETURNING *;
    `)
    .then(res => console.log(res.rows))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

    res.redirect("/items");
  });

  return router;
};
