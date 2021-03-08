const { database } = require('pg/lib/defaults');
const db = require('../server');


// Returns all the information of every menu item
const getItems = function () {
  return db.query(`
    SELECT *
    FROM items;
    `)
  // .then(data => data.rows)
}
// user clicks place order from cart

const createOrder = function (userId, itemObj) {
  // creates a new order row to create an order key
  const newOrder = `INSERT INTO orders (user_id) VALUES ($1);`

//TODO not sure how to find the total price of all items from items_orders
  // const totalPrice =
  

  // updates order created in newOrder and sets the total price of order
  const updateOrder = `UPDATE orders SET total_price = $1 WHERE user_id = $2 AND status = t;`
  return db.query(newOrder, [userId])
    .then(order => {
      // loops through user's ordered object and creates a new row of items_orders for each item
      for (const item in itemObj) {
        const itemsOrders = `INSERT INTO items_orders (order_id, item_id, quantity)
      VALUES ($1, $2, $3);`
        const itemsArray = [order.id, item.id, item.quantity]
        db.query(itemsOrders, itemsArray)
      }
    })
    .then()
    //TODO need to grab the total price and run updateOrder to update and return the full order detail

}




// /*TODO I tried to add to cart by adding to the database.. but it may be too difficult
// we may just have to use frontend javascript to add and update cart.*/

// const addItem = function (itemId, userId) {
//   // retrieve price of selected item
//   const itemPrice = `SELECT price
//   FROM items
//   WHERE id = $1;`

//   // create a new orders row
//   const newOrder = `INSERT INTO orders (user_id, total_price)
//   VALUES ($1, $2);`

//   // returns the db query to create new order. Argument of selected item's price expected.
//   const newOrderQuery = (price) => {
//     return db.query(newOrder, [userId, price]);
//   };

//   // retrieves all data from current order with matching userId and active status is true
//   // const retrieveOrder = `SELECT * FROM orders
//   // WHERE user_id = ${userId} and status = t;`

//   //creates a new row in items_orders that tracks the order id and item id and quantity
//   const itemsOrders = `INSERT INTO items_orders (item_id, order_id, quantity)
//   VALUES ($1, $2, $3);`

//   // returns the db query with the new items_orders
//   const itemsOrdersQuery = (order) => {
//     return db.query(itemsOrders, [itemId, order.id, 1])
//   };

//   //if order_id AND item_id exists, edit the number of quantity
//   if (db.query(`SELECT * FROM `))
//     const updatedOrdersQuery = () => {
//       return db.query(`
//     UPDATE items_orders
//     SET quantity = quantity + 1
//     WHERE item_id = $1 AND order_id = $2;
//     `)
//     }

//   db.query(itemPrice, [itemId])
//     .then(res => res.rows[0].price)
//     .then(newOrderQuery)
//     .then(itemsOrdersQuery)




  // post /cart route.


  //if itemID already exists with same orderID, change the quantity of item
  //creates a new order
  //console log new order info

// }



module.exports = {
  getItems
  // addItem
};
