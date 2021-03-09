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
  created_at = NOW()
  RETURNING status, created_at;
  `)
}

const getUserOrders = function (userId) {
  return db.query(`
  SELECT * FROM orders
  JOIN users ON orders.user_id = users.id
  WHERE users.id = ${userId}
  ORDER BY created_at DESC;
`)
};

const getAllOrders = function () {
  return db.query(`
  SELECT * FROM orders;
`)
};


const getSpecificOrder = function (orderId) {
  return db.query(`
  SELECT * FROM orders
  WHERE id = ${orderId};
`)
};

const getSpecificUserOrder = function (orderId, userId) {
  return db.query(`
  SELECT orders.id AS order_id, orders.status AS order_status, orders.created_at AS created_at,
  SUM(items.price) AS total_price
  FROM orders
  JOIN items_orders ON items_orders.order_id = orders.id
  JOIN items ON items.id = items_orders.items_id
  WHERE orders.id = ${orderId} AND user_id = ${userId}
  GROUP BY orders.id;
`)
};

const confirmOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  SET status = 'preparing'
  WHERE orderId = ${orderId};
  `)

}

module.exports = {
  getItems,
  getOrderId,
  createOrder,
  createOrderItem,
  getOrderItems,
  placeOrder,
  getUserOrders,
  getAllOrders,
  getSpecificOrder,
  getSpecificUserOrder,
  confirmOrder
};
