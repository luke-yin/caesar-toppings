-- Drop and recreate Widgets table

DROP TABLE IF EXISTS orders, items_orders, items CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  prep_duration INTEGER NOT NULL DEFAULT 0,
  photo_url VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at VARCHAR(100),
  status VARCHAR(30) NOT NULL
 );

CREATE TABLE items_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id),
  quantity INTEGER NOT NULL DEFAULT 0
);



