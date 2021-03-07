const db = require('../server');

// Returns all the information of every menu item
const getItems = function () {
  return db.query(`
    SELECT *
    FROM items;
    `)
    // .then(data => data.rows)
}





module.exports = {
  getItems
};
