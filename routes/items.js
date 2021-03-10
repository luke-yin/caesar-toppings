const express = require('express');
const router = express.Router();

//query functions
const { getAllItems, getOrderById, createOrder } = require('../db/items_queries');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session.userId; //TODO **** add user through req.session.userId
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
          req.session.orderId = order.id;
     
          const templateVars = { items: allItems, user: userName };
          //this page AJAX - loads ALL items for the order (existing order history)
          res.render('index', templateVars);
          return;
        }
 
        // no order in progress
        return createOrder(userId);
      })
      .then(orderId => {
        req.session.orderId = orderId; //TODO clear this on checkout
        console.log('THIS IS COOKIE ORDER ID!!!!!!🍪: ', req.session.orderId);
        res.redirect("/items");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};