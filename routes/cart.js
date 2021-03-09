/*
 * All rouor Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getItems, getOrderId, createOrder, createOrderItem } = require('../db/items_queries')

module.exports = (db) => {

  router.post("/", (req, res) => {
  // req from form(s), the quantity and the items(id)
  //tell luke to name the form submit (using serializeArray() to cart!)
  const userID = 1;
  let orderId = 0; 

  if (!userId) {
    res.redirect('/login');
    return
    };
     
  getOrderId(userID)
  .then(res => orderId = res.rows[0].id);

  const orderItems = req.body.cart; //should be an array of objects with itemId and quantity
  createOrderItem(orderItems, orderId);
  res.redirect('/cart');

  });

  router.get("/", (req, res) => {
    if (!userId) {
      res.redirect('/login');
      return
      };
  
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
