/*
 * All rouor Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getItems, getOrderId, createOrder, createOrderItem, getOrderItems } = require('../db/items_queries');
const items = require('./items');

module.exports = (db) => {

  router.post("/", (req, res) => {
  // req from form(s), the quantity and the items(id)
  //tell luke to name the form submit (using serializeArray() to cart!)
  const userId = req.session.userId; //TODO **** add user through req.session.userId
  const userName = req.session.userName; 
  const orderId = req.session.orderId
  const orderItems = req.body.cart; //should be an array of objects with itemId and quantity
  let orderId; 

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
    if (!userId) {
      res.redirect('/login');
      return
      };
      //do we need this getOrderId to retrieve orderId?
      //or can we pass orderID from previous post.
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
  
      //update status of orders = 'waiting_approval'//moment library
      placeOrder(orderId)

      //ejs file needs to have an if statement: if order status is 'waiting approval', we need to see that on screen
      
      //
  
      //send message to restaurant (twilio logic)

      //restaurant apporves order: maybe using SetTimeout to fake waiting for approval?
      setTimeout(function(){
        //Change order status to : ‘in preparation’
        //ejs file needs to have an if statement: if order status is ‘in preparation’, we need to see that on screen
        //send message to client (twilio logic)
      }, 5000);

      setTimeout(function(){
        //Change order status to : ‘completed’
        //ejs file needs to have an if statement: if order status is ‘completed’, we need to see that on screen
        
      }, 15000);


      
//       App.post (‘/cart/:orderid’)
// Places the order and sends notification to restaurant
// Sends message / shows on page - ‘order placed…etc’

      res.redirect('/cart', orderId);
    
      });



return router;
  
}

// db.query(`SELECT id FROM users WHERE name = $1;`, [userName]).then(
    //   (res) => (userId = res)
    // ); //** will this work? */
    // req.session.userId = userId;

      // .then(data => )//logs name of item about item
      // .catch(err => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
  //     });
  // });
  // return router;
// }
    // .then(data => {
    //   const order = data.rows;
    //   res.json({ order });
    //const templateVars = { cart }
    //info to send to the ejs file titled cart
    //res.render('cart', templateVars)
    //     })
    //     .catch(err => {
    //       res
    //         .status(500)
    //         .json({ error: err.message });
    //     });
    //   res.redirect("/");
    // });

    //TODO View Cart
    // router.get("/", (req, res) => {
    //   const userId = req.session.user_id;
    //   const
    //   db.query(`
    //     SELECT name, photo_url, price, FROM items
    //     JOIN users ON
    //     WHERE order_id = ${orderId};
    //   `)
    //     .then(data => {
    //       const cart = data.rows;
    //       // res.json({ cart });
    //       const templateVars = { cart }
    //       res.render('cart', templateVars)
    //     })
    //     .catch(err => {
    //       res
    //         .status(500)
    //         .json({ error: err.message });
    //     });
    // });



  //   return router;
  // }
