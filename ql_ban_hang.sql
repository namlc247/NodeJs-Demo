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

INSERT INTO category
  (name, status) 
VALUES 
  (N'Áo', 1),
  (N'Quần Bò', 1),
  (N'Dép', 0),
  (N'Quần ngố', 0),
  (N'Giày da', 0),
  (N'Giày thể thao', 0),
  (N'Áo bóng đá', 0),
  (N'Dép quai hậu', 0),
  (N'Áo vest', 0);

INSERT INTO product
  (name, price, category_id, image) 
VALUES
  ('Furry hooded parka', 59, 1, 'assets/img/shop/shop-1.jpg'),
  ('Flowy striped skirt', 49, 2, 'assets/img/shop/shop-2.jpg'),
  ('Croc-effect bag', 89, 1, 'assets/img/shop/shop-3.jpg'),
  ('Dark wash Xavi jeans', 79, 2, 'assets/img/shop/shop-4.jpg'),
  ('Ankle-cuff sandals', 99, 2, 'assets/img/shop/shop-5.jpg'),
  ('Contrasting sunglasses', 16, 3, 'assets/img/shop/shop-6.jpg'),
  ('Circular pendant earrings', 27, 4, 'assets/img/shop/shop-7.jpg'),
  ('Cotton T-Shirt', 109, 4, 'assets/img/shop/shop-8.jpg'),
  ('Water resistant zips backpack', 18, 3, 'assets/img/shop/shop-9.jpg');


INSERT INTO account
  (name, email, password) 
VALUES 
  ('qwe', 'qwe@gmail.com', '123');

INSERT INTO favourite
  (account_id, product_id)
VALUES
  (1, 2);
