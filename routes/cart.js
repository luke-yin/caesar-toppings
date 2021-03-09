/*
 * All rouor Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const express = require('express');
const router = express.Router();
const { getOrderId, createOrderItem, getOrderItems, placeOrder } = require('../db/items_queries');
const items = require('./items');

module.exports = (db) => {

  router.post("/", (req, res) => {
  // req from form(s), the quantity and the items(id)
  //tell luke to name the form submit (using serializeArray() to cart!)
  const userId = req.session.userId; //TODO **** add user through req.session.userId
  const userName = req.session.userName; 
  const orderId = req.session.orderId
  const orderItems = req.body.cart; //should be an array of objects with itemId and quantity
  // let orderId; 

  if (!userId) {
    res.redirect('/login');
    return
    };
     
  getOrderId(userID)
  .then(result => orderId = result.rows[0].id);

  createOrderItem(orderItems, orderId);
  res.redirect('/cart', orderId);

  });


  router.get("/", (req, res) => {
    const userId = req.session.userId;
    const userType = req.session.userType;
    
    if(userType === 'restaurant') {
      res.redirect('/orders')
      return;
    }

    if (!userId) {
      res.redirect('/login');
      return
      };

    getOrderId(userID)
    .then(result => orderId = result.rows[0].id);

    getOrderItems(orderId)
      .then(data => {
          const cartItems = data.rows;
          const templateVars = { cartItems }
          res.render('cart', templateVars)
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });


    router.post("/:orderid", (req, res) => {
      const userId = req.session.userId; //TODO **** add user through req.session.userId
      const userName = req.session.userName; 
      const orderId = req.session.orderId;
  
      //update status of orders = 'waiting_approval'
      placeOrder(orderId)
      .then(result => console.log(result))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

      res.redirect ('/orders/:orderId');

      

      //IMPLEMENT TWILIO
      // ON POST (places order) USE TWILIO TO SEND TEXT TO RESTAURANT

      
//       App.post (‘/cart/:orderid’)
// Places the order and sends notification to restaurant
// Sends message / shows on page - ‘order placed…etc’

      // res.redirect('/cart', orderId);
    
      });



return router;
  
}
