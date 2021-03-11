const { database } = require('pg/lib/defaults');
const db = require('../server');

// returns user info with user's first name
const getUser = function (userName) {
  return db.query(`
  SELECT * from users
  WHERE name = $1;`, [userName])
    .then(data => data.rows[0])
}

// Returns all the information of every menu item
const getAllItems = function () {
  return db.query(`
    SELECT *
    FROM items;
    `)
    .then(data => data.rows)
}

// Returns user's orders with status = precheckout
const getOrderById = function (userId) {
  return db.query(`

  SELECT * FROM orders
  WHERE user_id = ${userId} AND status = 'precheckout';

  `)
    .then(res => res.rows[0]);
};

// User logs in with ACTIVE order - load the order
const loadActiveOrder = function (orderId) {
  return db.query(`

  SELECT item_id, quantity
  FROM items_orders
  WHERE order_id = ${orderId}
  GROUP BY item_id, quantity;
  `)
    .then(res => res.rows);
};

//customer without ACTIVE order gets a new order created on get request of /items
const createOrder = function (userId) {
  return db.query(
    `INSERT INTO orders (user_id, status)
  VALUES (${userId}, 'precheckout')
  RETURNING *;
  `)
    .then(res => res.rows[0]);
};


// Receive order info from index.ejs and insert orders
const createOrderItem = function (orderItems, orderId) {
  //takes an array of promises
const promises = [];

  for (const item in orderItems) {

    if (item.value > 0) {
      promises.push(db.query(`INSERT INTO items_orders (item_id, order_id, quantity)
      VALUES (${item.id}, ${orderId}, ${item.quantity});
      `))
    }
  };
  return Promise.all(promises)
  .then(() => true)
  .catch(err => console.log(err))

};


// Returns order details AND total price of order
const getOrderItems = function (orderId) {
  return db.query(`
  SELECT order_id, items.name, items.price * quantity AS total, quantity, prep_duration, photo_url
  FROM items_orders
  JOIN items ON items.id = item_id
  WHERE order_id = ${orderId}
  GROUP BY items.id, quantity, order_id;
`)
.then(res => {
  let total = 0;
  res.rows.forEach(row => total += row.total)
  return {items: res.rows, total};
})
};


// user submits order and places order
const placeOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  status = 'waiting_approval'
  created_at = NOW()
  RETURNING status, created_at;
  `)
    .then(res => res.rows[0]);
}

//restaurant can receive all order history
const getAllOrders = function () {
  return db.query(`
  SELECT * FROM orders;
`)
    .then(res => res.rows);
};


const getUserOrders = function (userId) {
  return db.query(`
  SELECT * FROM orders
  JOIN users ON orders.user_id = users.id
  WHERE users.id = ${userId}
  ORDER BY created_at DESC;
`)
    .then(res => res.rows);
};



const getSpecificOrder = function (orderId) {
  return db.query(`
  SELECT * FROM orders
  WHERE id = ${orderId};
`)
    .then(res => res.rows[0]);
};

const getSpecificUserOrder = function (orderId, userId) {
  return db.query(`
  SELECT orders.id AS order_id, orders.status AS order_status, orders.created_at AS created_at,
  SUM(items.price) AS total_price
  FROM orders
  JOIN items_orders ON items_orders.order_id = orders.id
  JOIN items ON items.id = items_orders.item_id
  WHERE orders.id = ${orderId} AND user_id = ${userId}
  GROUP BY orders.id;
`)
    .then(res => res.rows[0]);
};

const confirmOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  SET status = 'preparing'
  WHERE orderId = ${orderId}
  RETURNING status;
  `)
    .then(res => res.rows[0]);
}

const completeOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  SET status = 'complete'
  WHERE orderId = ${orderId};
  `)
}


module.exports = {
  getUser,
  getAllItems,
  getOrderById,
  loadActiveOrder,
  createOrder,
  createOrderItem,
  getOrderItems,
  placeOrder,
  getUserOrders,
  getAllOrders,
  getSpecificOrder,
  getSpecificUserOrder,
  confirmOrder,
  completeOrder
};
