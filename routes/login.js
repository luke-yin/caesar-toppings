const express = require("express");
const app = express();
const router = express.Router();
const { getOrderId, createOrder } = require('../db/items_queries')
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    //hardcoded user for Demo purposes
    let userId;

    if (!userId) {
      let templateVars = {
        user: null,
      };
      res.render("login", templateVars);
      return;
    }
  
    res.redirect("/items");
  });

  router.post("/", (req, res) => {
    const userName = req.body.userName; //input = sori han
    const status = "precheckout";

    db.query(`
    SELECT id from users
    WHERE name = $1;`, [userName])
    .then(result => {
      if(!result.rows[0]){
        return res.status(401).json({ error: 'Invalid User' });
      }
     const userId = result.rows[0].id;
     getOrderId(userId)
     .then((result) => {
         //If an order is already in progress for that user
         if (result.rows.length > 0) {
           res.redirect("/items");
           return;
         }
         createOrder(userId, status)
        //  /UnhandledPromiseRejectionWarning: error: column "precheckout" does not exist
         .then(result => {
           let orderId = result.rows[0].id;
           req.session.orderId = orderId; //TODO clear this on checkout
           req.session.userId = userId; //cookies
           req.session.userName = userName; //cookies
           res.redirect("/items");
          })
        })  
    })
    .catch((err) => {
    res.status(500).json({ error: err.message });
  });
});
return router;
};
