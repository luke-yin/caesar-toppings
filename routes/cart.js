/*
 * All rouor Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const { response } = require('express');
const express = require('express');
const router = express.Router();
const { createOrderItem, getOrderItems, placeOrder } = require('../db/items_queries');


module.exports = (db) => {

  router.post("/", (req, res) => {
    // req from form(s), the quantity and the items(id)
    //tell luke to name the form submit (using serializeArray() to cart!)
    const userId = req.session.userId; //TODO **** add user through req.session.userId
    // const userName = req.session.userName;
    const order = req.session.order;

    const orderItems = req.body; //should be an array of objects with itemId and quantity
    //an object {5:1, 1:1, etc }
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

    // if user's order is waiting_approval, preparation, or completed
    //user is directed to the specific order info page
    res.redirect(`/orders/${order.id}`);
  });


  router.get("/", (req, res) => {
    const userId = req.session.userId;
    const userType = req.session.userType;
    const order = req.session.order;

    if (userType === 'restaurant') {
      console.log('>>>>> cart.js line 51. this is the restaurant user: ', userId)
      res.redirect('/orders');
      return;
    }

    if (!userId) {
      res.redirect('/login');
      return;
    }

    //User logged in
    getOrderItems(order.id)
      .then(items => {
        console.log('>>>>> cart.js line 64. this is the customer user: ', userId)
        console.log('>>>>> cart.js line 64. this is the customer user order: ', order.id)
        const templateVars = { items };
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


    //       App.post (‘/cart/:orderid’)
    // Places the order and sends notification to restaurant
    // Sends message / shows on page - ‘order placed…etc’

    // res.redirect('/cart', orderId);

  });
  return router;
};
