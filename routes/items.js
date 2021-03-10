const express = require('express');
const router = express.Router();

//query functions
const { getAllItems, getOrderById, createOrder } = require('../db/items_queries');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session.userId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (userType === 'restaurant') {
      res.redirect('/orders');
      return;
    }

    if (!userId) {
      res.redirect('/login');
      return;
    }

    //This is a logged in user
    let allItems;

    getAllItems()
      .then(items => {
        allItems = items;
        //user is signed in and has a pre-existing active order
        return getOrderById(userId);
      })
      .then((order) => {
        if (order) {
          req.session.order = order;
          console.log('>>>>"items.js/35" order is already active this is the order: ', order)

          const templateVars = { items: allItems, user: userName };
          res.render('index', templateVars);
          return;
        }
        // no order in progress
        createOrder(userId)
        .then(order => {
          req.session.order = order;
          const templateVars = { items: allItems, user: userName };
          console.log('>>>>"items.js/49" order was JUST created + stored into🍪: ', req.session.order);
          res.render("index", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
