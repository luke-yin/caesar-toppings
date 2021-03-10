const express = require('express');
const router = express.Router();
const { createOrderItem, getOrderItems, placeOrder } = require('../db/items_queries');
const items = require('./items');


module.exports = (db) => {

  // 🛒 Customer chooses items and views cart
  router.post("/", (req, res) => {
    const userId = req.session.userId; //TODO **** add user through req.session.userId
    const order = req.session.order;
    const orderItems = req.body;


    console.log('this is the body we return for order!!!', orderItems);

    if (!userId) {
      res.redirect('/login');
      return;
    }

    //TODO make sure this works
    if (order.status === 'precheckout') {
      createOrderItem(orderItems, order.id)
        .then(() => res.redirect('/cart'))
      return;
    }

    // if user's order is anything but 'precheckout'
    res.redirect(`/orders/${order.id}`);
  });


  router.get("/", (req, res) => {
    const userId = req.session.userId;
    const userType = req.session.userType;
    const order = req.session.order;
    const orderId = order.id;

    if (userType === 'restaurant') {
      console.log('>>>>> cart.js line 51. this is the restaurant user: ', userId)
      res.redirect('/orders');
      return;
    }

    if (!userId) {
      res.redirect('/login');
      return;
    }

    //Send current order's items and total of the full order
    getOrderItems(orderId)
      .then(data => {
        const {items, total} = data
        const templateVars = { items, total, orderId };
        console.log(items, total)
        res.render('cart', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:orderid", (req, res) => {
    const userId = req.session.userId; //TODO **** add user through req.session.userId
    const order = req.session.order;

    //update status of orders = 'waiting_approval'
    placeOrder(order.id)
      .then(order => {
        console.log(order);
        res.redirect(`/orders/${order.id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    //IMPLEMENT TWILIO
    // ON POST (places order) USE TWILIO TO SEND TEXT TO RESTAURANT
    // restaurant should confirm how long it'll take
    //

    //       App.post (‘/cart/:orderid’)
    // Places the order and sends notification to restaurant
    // Sends message / shows on page - ‘order placed…etc’

    // res.redirect('/cart', orderId);

  });
  return router;
};
