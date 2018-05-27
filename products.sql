DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE DATABASE bamazon_db;

CREATE TABLE product_table (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER(40) NOT NULL,
    stock_quantity INTEGER(40),

    PRIMARY KEY (id)


)

INSERT INTO product_table(product_name, department_name, price, stock_quantity) VALUE ('Duvet Cover', 'Home', 89.99, 25),
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