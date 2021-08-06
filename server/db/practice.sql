CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    onsale BOOLEAN
);

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location varchar(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restauraunts (id, name, location, price_range) VALUES(123, 'mcdonalds', 'new york', 3);

UPDATE restaurants SET name = 'red lobster', location = 'miami', price_range = 4 WHERE id = 5;

DELETE FROM restaurants WHERE id = '6';