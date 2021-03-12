const express = require('express');
const router = express.Router();
const { createOrderItem, getOrderItems, placeOrder } = require('../db/items_queries');
// const items = require('./items');
const twilio = require('./send-sms');

// let cart = window.localStorage.getItem("cart"); // Cart object as a JSON string

module.exports = (db) => {



  // 🛒 Show customer the cart details before checkout
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



  // 🛒 Customer clicks view cart - directs them to /cart
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    const order = req.session.order;

    const orderItems = req.body.cartOB;

    // localstorage of cart from front-end
    // const orderItems = cart;

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
    res.redirect(`/customer/orders/${order.id}`);
  });



// 🛒  Submit and checkout the order
  router.post("/:orderid", (req, res) => {
    // TODO for repeated storage of cookie or other info, use a function and call that function
    const order = req.session.order;
    //TODO refactor using :orderid <-- use the actual param within route
    // const order = req.params.orderid
    const userId = req.session.userId;

    //update status of orders = 'waiting_approval'
    placeOrder(order.id, userId)
      .then(orderStatus => {
        console.log('🛒 order has been submitted', orderStatus, order.id);
        twilio();
        res.redirect(`/orders/customer/${order.id}`);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });



  return router;
};
