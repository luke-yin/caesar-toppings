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
  
  
  const createOrder = function (userId) {
    return db.query(
    `INSERT INTO orders (user_id, status)
    VALUES (${userId}, 'precheckout')
    RETURNING id;
    `);
    //RETURNING * ;
    //.then(res => console.log(res.rows))
};

const createOrderItem = function (orderItems, orderId) {

  for (const item of orderItems) {

    if(item.value > 0) {
      db.query(`INSERT INTO items_orders (item_id, order_id, quantity)
      VALUES (${item.itemId}, ${orderId}, ${item.value});
      `)
    }
  };
  return 
};

const getOrderItems = function (orderId) {
  return db.query(`
  SELECT name, price, prep_duration, photo_url FROM items
JOIN items_orders ON items.id = items_orders.id
JOIN orders ON order_id = orders.id
WHERE orders.id = ${orderId};
`)
};


const placeOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  status = 'waiting_approval'
  created_at = NOW();
  `)
}


module.exports = {
  getItems,
  getOrderId,
  createOrder,
  createOrderItem,
  getOrderItems,
  placeOrder
};
