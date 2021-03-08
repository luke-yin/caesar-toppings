const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //
    let userId; 

    if (!userId) {
      const templateVars = {
        user: null,
      };
      res.render("login", templateVars);
    }
    res.redirect("/items");
  });

  router.post("/", (req, res) => {
    const userName = req.body.userName; //input = sori han
    let userId = 1;
    // db.query(`SELECT id FROM users WHERE name = $1;`, [userName]).then(
    //   (res) => (userId = res)
    // ); //** will this work? */
    // req.session.userId = userId;

    res.redirect("/items");
  });

  return router;
};
