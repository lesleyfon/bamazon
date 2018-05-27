DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE product_table (
    id INT NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(100),
    dept_name VARCHAR(100),
    price INTEGER(100) NOT NULL,
    stock_qty INTEGER(100),

    PRIMARY KEY (id)
);

INSERT INTO product_table (prod_name, dept_name, price, stock_qty) VALUE ('Duvet Cover', 'Home', 89.99, 25),
 ('Mens Zip-up Hoodie', 'Mens Clothing', 29.99, 25),
('Glass Catch-all Dish', 'Home', 15.99, 10),
('Record Player', 'Electronics', 110.99, 8),
('High Rise Skinny Jeans - Black', 'Womens Clothing', 59.99, 30),
('Womens Bruce Springsteen Baseball T-shirt', 'Womens Clothing', 25.99, 8),
('Mens Knit Beanie - Blue', 'Mens Clothing', 21.99, 15),
('Striped Jersey Cotton Sheets - Queen', 'Home', 49.99, 10),
('Spiked Dog Leash', 'Pets', 25.99, 10),
('Shark Kitty Bed', 'Pets', 59.99, 5);

SELECT * FROM product_table;