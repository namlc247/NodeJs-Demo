CREATE DATABASE `ql_ban_hang`;
USE ql_ban_hang;

CREATE TABLE category
(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL UNIQUE,
    status tinyint
);

CREATE TABLE account
(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role varchar(50) not null DEFAULT 'customer',
    created_at date DEFAULT NOW(),
    last_login datetime DEFAULT NOW()
);

CREATE TABLE product
(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(120) NOT NULL,
    price float NOT NULL,
    sale_price float NULL DEFAULT '0',
    image varchar(200) NULL,
    category_id int NOT NULL,
    status tinyint NULL DEFAULT '1',
    description text NULL,
    created_at date DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE favourite
(
    id int PRIMARY KEY AUTO_INCREMENT,
    account_id int NOT NULL,
    product_id int NOT NULL,
    created_at date DEFAULT NOW(),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE cart
(
    id int PRIMARY KEY AUTO_INCREMENT,
    account_id int NOT NULL,
    product_id int NOT NULL,
    quantity int DEFAULT 1,
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO category
  (name, status) 
VALUES 
  ('Women', 1),
  ('Men', 1),
  ('Bag', 1),
  ('Accessories', 1),
  ('Boots', 1);

INSERT INTO product
  (name, price, sale_price, category_id, image) 
VALUES
  ('Buttons tweed blazer', 88, 26, 1, 'assets/img/product/product-1.jpg'),
  ('Pink Shirt', 80, 0, 2, 'assets/img/product/product-2.jpg'),
  ('Orange Skirt', 50, 5, 1, 'assets/img/product/product-3.jpg'),
  ('Slim striped shirt', 100, 0, 2, 'assets/img/product/product-4.jpg'),
  ('Fit corduroy shirt', 40, 4, 2, 'assets/img/product/product-5.jpg'),
  ('Tropical Kimono', 59, 49, 1, 'assets/img/product/product-6.jpg'),
  ('Contrasting sunglasses', 66, 0, 1, 'assets/img/product/product-7.jpg'),
  ('Hawaii Shirt', 106, 33, 2, 'assets/img/product/product-8.jpg'),
  ('Furry hooded parka', 59, 0, 1, 'assets/img/shop/shop-1.jpg'),
  ('Flowy striped skirt', 49, 0, 3, 'assets/img/shop/shop-2.jpg'),
  ('Croc-effect bag', 89, 12, 1, 'assets/img/shop/shop-3.jpg'),
  ('Dark wash Xavi jeans', 79, 20, 2, 'assets/img/shop/shop-4.jpg'),
  ('Ankle-cuff sandals', 99, 30, 5, 'assets/img/shop/shop-5.jpg'),
  ('Contrasting sunglasses', 16, 0, 3, 'assets/img/shop/shop-6.jpg'),
  ('Circular pendant earrings', 27, 5, 4, 'assets/img/shop/shop-7.jpg'),
  ('Cotton T-Shirt', 109, 50, 4, 'assets/img/shop/shop-8.jpg'),
  ('Water resistant zips backpack', 18, 0, 5, 'assets/img/shop/shop-9.jpg');


INSERT INTO account
  (name, email, password) 
VALUES 
  ('Admin', 'abc@gmail.com', '123');
