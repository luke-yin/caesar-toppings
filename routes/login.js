const express = require("express");
const app = express();
const router = express.Router();
const { getUser } = require('../db/items_queries');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));


//⚠️ npm run db:reset


module.exports = (db) => {



  // 🔑 Login page - redirected to here if user is logged out
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.render("login", { user: null, });
      return;
    }
    res.redirect("/items");
  });



// 🔑 Submit Login - stores userId, userName, userType as cookie session
  router.post("/", (req, res) => {
    const userName = req.body.userName;

    getUser(userName)
      .then(user => {
        if (!user) return res.status(401).json({ error: 'Invalid User' });

        const userId = user.id;
        const userType = user.type;
        req.session.userId = userId;
        req.session.userName = userName;
        req.session.userType = userType;

        res.redirect('/items');
      });
  });


  return router;
};
