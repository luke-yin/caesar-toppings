const express = require("express");
const router = express.Router();
const { getAllOrders, getUserOrders, getSpecificOrder, getSpecificUserOrders, confirmOrder, completeOrder } = require('../db/items_queries');


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
      .then(orders => {
        templateVars = { orders, userType, user: userName };
        res.render('orders', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/:orderid", (req, res) => {
    let templateVars = {};
    const userId = req.session.userId;
    const order = req.session.order;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }
    // if restaurant - show the specific order details. (all the items)
    if (userType === 'restaurant') {

      //TODO customer is already on this page (submitted order)
      //Restaurant may come back after 'confirming' order
      //We need to somehow refresh the message on customer side
      //and show that their cookie @ order.status is now at 'preparation'

      getSpecificOrder(order.id)
        .then(customerOrder => {
          templateVars = { customerOrder };
          res.render('order', templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      return;
    }

    getSpecificUserOrders(order.id, userId)
      .then(userOrder => {
        templateVars = { userOrder };
        res.render('order', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  router.post("/:orderid/confirm", (req, res) => {

    const userId = req.session.userId;
    const order = req.session.order;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }
    //TODO we can grab the order in full instead of just order id when they log in
    if (userType === 'restaurant') {
      confirmOrder(order.id)
        .then(status => {
          //update the order Status in the session object @ order.status
          order.status = status;
          res.redirect(`/orders/${orderId}`)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
        //TODO AJAX can listen for change in order.status cookie? or from orders??????????
      //TODO when restaurant confirms order, we need to let the custmer know the order is in preparation
    };

    router.post("/:orderid/complete", (req, res) => {

      const userId = req.session.userId;
      const orderId = req.session.orderId;
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
