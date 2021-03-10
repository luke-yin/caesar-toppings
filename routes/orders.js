const express = require("express");
const router = express.Router();
const { getAllOrders, getUserOrders, getSpecificOrder, getSpecificUserOrder, confirmOrder, completeOrder } = require('../db/items_queries');


module.exports = (db) => {

  //main page for restaurant. if restaurant at login. user gets redirected here.
  router.get("/", (req, res) => {

    const userId = req.session.userId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }

    let templateVars = {};

    if (userType === 'restaurant') {
      getAllOrders()
        .then(orders => {
          templateVars = { orders, userType, user: userName };
          res.render('orders', templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

      return;
    }

    //order history for specific user
    getUserOrders(userId)
      .then(data => {
        const orders = data.rows;
        templateVars = {orders, userType, user: userName};
        res.render('orders', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/:orderId", (req, res) => {
    let templateVars = {};
    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }
    // if restaurant - show the specific order details. (all the items)
    if (userType === 'restaurant') {
      getSpecificOrder(orderId)
        .then(order => {
          templateVars = {order};
          res.render('order', templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
        return;
    }

    getSpecificUserOrder(orderId, userId)
      .then(order => { templateVars = { order };
        res.render('order', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  router.post("/:orderId/confirm", (req, res) => {

    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }
//TODO we can grab the order in full instead of just order id when they log in
    if (userType === 'restaurant') {
      confirmOrder(orderId)
        .then(order =>{
          req.session.orderStatus = order.status;
          res.redirect(`/orders/${orderId}`)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    //TODO when restaurant confirms order, we need to let the custmer know the order is in preparation
  };

  router.post("/:orderId/complete", (req, res) => {

    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }

    if (userType === 'restaurant') {
      completeOrder(orderId)
        .then(() => res.redirect('/orders'))
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }
  });


  });
return router;
};
