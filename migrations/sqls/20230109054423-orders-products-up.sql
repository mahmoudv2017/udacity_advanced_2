create TABLE orders_products(id serial PRIMARY KEY , quantity integer , product_id bigint REFERENCES products(id),order_id bigint REFERENCES orders(id));