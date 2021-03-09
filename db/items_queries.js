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

const getOrderId = function (userId) {
return db.query(`
SELECT id FROM orders
WHERE user_id = ${userId} AND status = 'precheckout';
`)
};


const createOrder = function (userId, status) {
  return db.query(
  `INSERT INTO orders (user_id, status)
  VALUES (${userId}, ${status});
  `);
    //RETURNING * ;
    //.then(res => console.log(res.rows))
};

const createOrderItem = function (itemId, orderId) {
return db.query(`
INSERT INTO items_orders (item_id, order_id, quantity)
VALUES (${item.itemId}, ${orderId}, ${item.value});
`)

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
  getItems,
  getOrderId,
  createOrder,
  createOrderItem
};
