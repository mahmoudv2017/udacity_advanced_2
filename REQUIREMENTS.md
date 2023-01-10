# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
- Available Routes
    1 - A SHOW route: 'Products/:id' [GET] 
    2 - A Index route: 'Products/' [GET] 
    3 - A Upldate route: 'Products/:id' [PUT] 
    4 - A Create route: 'Products/' [POST] 


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]
- Available Routes
    1 - A Login route: 'Login/' [POST] 
    2 - A Register route: 'register' [POST] 


#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- Available Routes
    1 - A SHOW route: 'user/:userID/orders' [GET] 
    2 - A Index route: 'user/:userID/orders/:orderID' [GET] 
    3 - A Upldate route: 'user/:userID/orders/:orderID' [PATCH] 
    4 - A Create route: 'user/:userID/orders' [POST] 
    5 - A Delete route: 'user/:userID/orders/:orderID' [DELETE] 
    6 - An addProduct route: '/users/:userID/orders/:orderID/products' [POST] 

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

- Table: Product (id:serial primary key, name:varchar, price:float, category:varchar)


#### User
- id
- firstName
- lastName
- password

- Table: users (id:serial primary key, firstname:varchar, lastname:varchar, password:text)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

- Table: orders (id:serial primary key, user_id:references users(id), status varchar  )
- Table: orders-products (id:serial primary key, order_id references orders(id), product_id:references product(id) , quantity  integer)

