const express = require('express');
const router = express.Router();

//query functions
const { getAllItems, getOrderById, createOrder, loadActiveOrder } = require('../db/items_queries');
const { totalCount } = require('../server');


module.exports = (db) => {


  // 🛍 Main Order Page For Customer
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

    //Display menu item for customer
    let allItems;

    getAllItems()
      .then(items => {
        allItems = items;
        return getOrderById(userId); //check if user has ACTIVE order
      })

      .then((order) => {
        if (order) {
          req.session.order = order;

          //if user has ACTIVE order load the active order
          loadActiveOrder(order.id)
            .then(activeOrder => {
              const templateVars = { items: allItems, user: userName, activeOrder };
              res.render('index', templateVars);
            })
            .catch((err) => { res.status(500).json({ error: err.message }); });

          return;
        }

        createOrder(userId) // create NEW order if no active order
          .then(order => {
            req.session.order = order;
            const templateVars = { items: allItems, user: userName };
            res.render('index', templateVars);
          })

        return;
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });




  return router;
};
