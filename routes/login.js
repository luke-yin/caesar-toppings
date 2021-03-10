const express = require("express");
const app = express();
const router = express.Router();
const { getOrderId, createOrder } = require('../db/items_queries');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

module.exports = (db) => {
  router.get("/", (req, res) => {

    const userId = req.session.userId;

    if (!userId) {
      let templateVars = {
        user: null,
      };
      res.render("login", templateVars);
      return;
    }

    res.redirect("/items");
  });



  //REMINDER: Reset db
  router.post("/", (req, res) => {
    const userName = req.body.userName;
    db.query(`
    SELECT * from users
    WHERE name = $1;`, [userName])
      .then(user => {
        if (!user.rows[0]) {
          return res.status(401).json({ error: 'Invalid User' });
        }
        const userId = user.rows[0].id;
        const userType = user.rows[0].type;

        req.session.userId = userId;
        req.session.userName = userName;
        req.session.userType = userType;
        console.log('userId in login.js line 46: ', userId)
        console.log('userName in login.js line 47: ', userName)
        console.log('userType in login.js line 48: ', userType)
        res.redirect('/items');
      });
  });

  return router;
};
