/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addItem } = require('../db/items_queries')

module.exports = (db) => {

  router.post("/:itemId", (req, res) => {

    const { itemId } = req.params;
    const userId = req.session.userId;
    console.log('this is the item:' + itemId)
    // new helper query to add.. but we may need to use arrays to hold cart items
  //   addItem(itemId, userId)
  //     .then(data => console.log(data.name))//logs name of item about item
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
}
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
  // };
