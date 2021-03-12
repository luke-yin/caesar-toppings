const express = require("express");
const router = express.Router();
const { getAllOrders, getUserOrders, getSpecificOrder, getSpecificUserOrder, confirmOrder, completeOrder, getOrderItems } = require('../db/items_queries');
const twilio = require('./send-sms');


module.exports = (db) => {

  // 📘 view all order history for customers and restaurant
  router.get("/", (req, res) => {

    const userId = req.session.userId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }

    let templateVars = {};

    //if userType = restaurant, show ALL order history
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

        templateVars = { orders, userType, user: userName, };
        res.render('orders', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // 📘 specific order info - order status for customer
  router.get("/customer/:orderid", (req, res) => {
    let templateVars = {};
    const userId = req.session.userId;
    const order = req.params.orderid;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }
    // if restaurant - redirect
    if (userType === 'restaurant') {
      res.redirect('/orders/restaurant/:orderid');
      return;
    }

    //TODO returns undefined from query
    getSpecificUserOrder(order, userId)
      .then(userOrder => {
        console.log('placed order🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡', userOrder)
        templateVars = { ...userOrder, userType };
        res.render('order', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });





  // 📘 restaurant's order detail page
  router.get("/restaurant/:orderid", (req, res) => {
    let templateVars = {};
    const userId = req.session.userId;
    const orderId = req.params.orderid;
    const userType = req.session.userType;


    if (!userId) {
      res.redirect('/login');
      return;
    }

    // if customer - redirect
    if (userType === 'customer') {
      res.redirect('/orders/customer/:orderid');
      return;
    }


    getOrderItems(orderId)
      .then(customerOrder => {
        console.log('>>>>>🤡customer oRDER!!!!!!!', customerOrder)
        templateVars = { ...customerOrder, userType };
        res.render('order_confirm', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });



  // 📘 Restaurant confirms the order and notifies user
  router.post("/restaurant/:orderid/confirm", (req, res) => {

    const userId = req.session.userId;
    const orderId = req.params.orderid;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
    }

    if (userType === 'restaurant') {
      confirmOrder(orderId)
        .then(confirmedOrder => {
          console.log('🥤 restaurant confirmed order🥤🥤🥤🥤🥤🥤🥤 notifying customer 🥤🥤🥤🥤 : ', confirmedOrder);
          twilio();
          res.redirect(`/orders`)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    };
  });

  //📘 Restaurant confirms the completion of order. Notify user and changes order status
  router.post("/restaurant/:orderid/complete", (req, res) => {

    const userId = req.session.userId;
    // const orderId = req.params.orderid;
    const userType = req.session.userType;
    console.log('orderId: ', orderId)
    if (!userId) {
      res.redirect('/login');
      return;
    }

    if (userType === 'restaurant') {
      completeOrder(orderId)//does not exist?

        .then(completedOrder => {
          console.log('✅ restaurant completed order🥤 : ', completedOrder);
          res.redirect('/orders')
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

      return;
    }
    res.redirect('/items');



  });
  return router;

};


