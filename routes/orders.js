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
      return
      };

let templateVars = {};

if (userType ==='restaurant') {
  getAllOrders()
  .then(data => {
    const orders = data.rows;
    templateVars = {
      orders,
      userType,
      user: userName
    }
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
}

    //order history for specific user
    getUserOrders(userId)
    .then(data => {
      const orders = data.rows;
      templateVars = {
        orders,
        userType,
        user: userName
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

    res.render('orders', templateVars);
  });

    // router.get '/orders'
      // if customer show ALL customer specific orders and their status
      // status, total price, created at
      // if restaurant show ALL  orders and their status. (waiting approval at top)
      // status, total price, created at
  
  

  router.get("/:orderId", (req, res) => {
    let templateVars = {};
    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;
    
    if (!userId) {
      res.redirect('/login');
      return
      };
      // if restaurant - show the specific order details. (all the items)
      if (userType === 'restaurant') {
        getSpecificOrder(orderId)
        .then(data => {
          const order = data.rows[0];
          templateVars = {
            order
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      }

      getSpecificUserOrder(orderId, userId)
      .then(data => {
        const order = data.rows[0];
        templateVars = {
          order
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


    res.render('order', templateVars);
      
  });


  router.post("/:orderId/confirm", (req, res) => {

    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
      };

    if (userType === 'restaurant') {
      confirmOrder(orderId)
      .then(() => res.redirect('/orders/:orderId'))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
//TODO when restaurant confirms order, we need to let the custmer know the order is in preparation
  });

  router.post("/:orderId/complete", (req, res) => {

    const userId = req.session.userId;
    const orderId = req.session.orderId;
    const userName = req.session.userName;
    const userType = req.session.userType;

    if (!userId) {
      res.redirect('/login');
      return;
      };

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


  
  // router.get '/orders/:orderId
     
        // if restaurant show 'accept' button that updates the status to 'in_preparation'
      // if customer this is where 'checkout' takes them to. 
        // if customer this thanks the customer, order number,  maybe gives them estimated time, and updates the status when restaurant accepts it. 


// /orders/:orderId/confirm
// /orders/:orderId/



  //TODO add to table: user type

  // orders.ejs 
    // router.get '/orders'
      // if customer show ALL customer specific orders and their status
      // status, total price, created at
      // if restaurant show ALL  orders and their status. (waiting approval at top)
      // status, total price, created at

    // router.get '/orders/:orderId
      // if restaurant - show the specific order details. (all the items)
        // if restaurant show 'accept' button that updates the status to 'in_preparation'
      // if customer this is where 'checkout' takes them to. 
        // if customer this thanks the customer, order number,  maybe gives them estimated time, and updates the status when restaurant accepts it. 





 

  return router;
};


//ejs file needs to have an if statement: if order status is 'waiting approval', we need to see that on screen
      
      //
  
      //send message to restaurant (twilio logic)

      //restaurant apporves order: maybe using SetTimeout to fake waiting for approval?
      // setTimeout(function(){
      //   //Change order status to : ‘in preparation’
      //   //ejs file needs to have an if statement: if order status is ‘in preparation’, we need to see that on screen
      //   //send message to client (twilio logic)
      // }, 5000);

      // setTimeout(function(){
      //   //Change order status to : ‘completed’
      //   //ejs file needs to have an if statement: if order status is ‘completed’, we need to see that on screen
        
      // }, 15000);