/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`----WRITE QUERY----`)
      .then(data => {
        const cart = data.rows;
        res.json({ cart });
        //const templateVars = { cart }
        //info to send to the ejs file titled cart
        //res.render('cart', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    //I'm inside a route so wondering where I will get redirected
    res.redirect("/");
  });

  return router;
};
