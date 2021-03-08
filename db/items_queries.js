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

const addItem = function (itemId) {
// post /cart route.
//user selects add to cart on specific item (itemID)
return db.query(`
SELECT name, price
FROM items
WHERE id = ${itemId};
`).then(res => res.rows)

//if itemID already exists with same orderID, change the quantity of item
//creates a new order
//console log new order info

}



module.exports = {
  getItems,
  addItem
};
