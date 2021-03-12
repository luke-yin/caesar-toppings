const { database } = require('pg/lib/defaults');
const db = require('../server');

// returns user info with user's first name
const getUser = function (userName) {
  return db.query(`
  SELECT * from users
  WHERE name = $1;`, [userName])
    .then(data => data.rows[0])
};

// Returns all the information of every menu item
const getAllItems = function () {
  return db.query(`
    SELECT *
    FROM items;
    `)
    .then(data => data.rows)
};

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

  for (let item in orderItems) {

    item = Number(item);
    let quantity = Number(orderItems[item]);

    if (quantity  > 0) {
      promises.push(db.query(`INSERT INTO items_orders (item_id, order_id, quantity)
      VALUES (${item}, ${orderId}, ${quantity});
      `))
    }
  };
  return Promise.all(promises)
    .then(() => true)
    .catch(err => console.log(err))

};


// returns order details AND total price of order
const getOrderItems = function (orderId) {
  return db.query(`
  SELECT status, order_id, items.name, items.price * quantity AS total, quantity, prep_duration, photo_url
  FROM items_orders
  JOIN items ON items.id = item_id
  JOIN orders ON orders.id = order_id
  WHERE order_id = ${orderId}
  GROUP BY items.id, quantity, order_id, status;
`)
    .then(res => {
      let total = 0;
      res.rows.forEach(row => total += row.total)
      return { items: res.rows, total };
    })
};


// user submits order and places order
const placeOrder = function (orderId, userId) {
  return db.query(`
  UPDATE orders
  SET status = 'waiting_approval',
  created_at = clock_timestamp()
  WHERE id = ${orderId} and user_id = ${userId}
  RETURNING *;
  `)
    .then(res => res.rows[0]);
};

//restaurant can receive all order history
const getAllOrders = function () {
  return db.query(`
  SELECT * FROM orders
  ORDER BY created_at;
`)
    .then(res => res.rows);
};

// returns all order history from user
const getUserOrders = function (userId) {
  return db.query(`
  SELECT orders.id AS id, orders.status, created_at
  FROM orders
  JOIN users ON orders.user_id = users.id
  WHERE users.id = ${userId}
  ORDER BY orders.id DESC;
`)
    .then(res => res.rows);
};


// returns one order using orderId
const getSpecificOrder = function (orderId) {
  return db.query(`
  SELECT * FROM orders
  WHERE id = ${orderId};
`)
    .then(res => res.rows[0]);
};


// returns specific order for user
const getSpecificUserOrder = function (orderId, userId) {
  return db.query(`
  SELECT status, order_id, items.name, items.price * quantity AS total, quantity, prep_duration, photo_url, SUM(items.price) AS total_price
  FROM items_orders
  JOIN items ON items.id = item_id
  JOIN orders ON orders.id = order_id
  WHERE order_id = $1 AND user_id = $2
  GROUP BY items.id, quantity, order_id, status;
`, [orderId, userId])
    .then(res => {
      let total = 0;
      res.rows.forEach(row => total += row.total)
      return { items: res.rows, total };
    })
};



// order status is updated on restaurant's confirm.
const confirmOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  SET status = 'preparing'
  WHERE id = ${orderId}
  RETURNING *;
  `)
    .then(res => res.rows[0]);
};


// order status is updated on restaurant's complete
const completeOrder = function (orderId) {
  return db.query(`
  UPDATE orders
  SET status = 'complete'
  WHERE ordersid = ${orderId}
  RETURNING *;
  `)
};




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
