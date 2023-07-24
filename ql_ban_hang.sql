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
  (name, price, sale_price, status, category_id) 
VALUES
  (N'Áo sơ mi công sở', 200000, 0, 1, 1),
  (N'Quần ngố đôi đẹp', 100000, 0, 1, 2),
  (N'Áo sơ mi công sở 458', 350000, 35000, 1, 1),
  (N'Quần ngố đôi đẹp 458', 2000000, 200000, 1, 2);

INSERT INTO account
  (name, email, password) 
VALUES 
  ('qwe', 'qwe@gmail.com', '123');

INSERT INTO favourite
  (account_id, product_id)
VALUES
  (1, 2);
