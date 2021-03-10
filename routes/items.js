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

    console.log('>>>>🛍 userType', userType);

    if (userType === 'restaurant') {
      console.log(`>>>>>>🛍 Redirecting restaurant user ${userName} to /orders`);
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
          console.log('>>>>🛍 user has ACTIVE order: ', order)

          //if user has ACTIVE order load the active order
          //promise error
          loadActiveOrder(order.id)
          .then(res => {return console.log('active order info: ',res)})
          .catch((err) => {res.status(500).json({ error: err.message });});

          //TODO send the ACTIVE order info to index.ejs to populate the quantity / cart price
          const templateVars = { items: allItems, user: userName };
          res.render('index', templateVars);
          return;
        }

        createOrder(userId) // create NEW order if no active order
          .then(order => {
            req.session.order = order;
            const templateVars = { items: allItems, user: userName };
            console.log('>>>>🛍 created NEW order: ', order)
            res.render('index', templateVars);
          })
return;
          // .catch((err) => {
          //   res.status(500).json({ error: err.message });
          // });
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });




  return router;
};
