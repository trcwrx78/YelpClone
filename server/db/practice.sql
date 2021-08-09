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

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

-- ON DELETE CASCADE FIXES THE ISSUE OF DELETING A RESTAURANT WHEN IT HAS REVIEWS
CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 AND rating <= 5)
);

INSERT INTO restauraunts (id, name, location, price_range) VALUES(123, 'mcdonalds', 'new york', 3);

UPDATE restaurants SET name = 'red lobster', location = 'miami', price_range = 4 WHERE id = 5;

DELETE FROM restaurants WHERE id = '6';

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (900, 'carl', 'restaurant was awesome', 5);

-- Aggregate Functions of PostGres and Advanced Topics
SELECT COUNT(*) FROM reviews;
SELECT COUNT(rating) FROM reviews;
SELECT MIN(rating) FROM reviews;
SELECT MAX(rating) FROM reviews;
SELECT AVG(rating) FROM reviews;
SELECT TRUNC(AVG(rating), 2) AS average_review FROM reviews;

SELECT TRUNC(AVG(rating), 2) AS average_rating FROM reviews WHERE restaurant_id = 3;
SELECT COUNT(rating) FROM reviews WHERE restaurant_id = 3;

SELECT location, COUNT(location) FROM restaurants GROUP BY location;
SELECT restaurant_id, COUNT(restaurant_id) FROM reviews GROUP BY restaurant_id;

-- SQL joins
SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;
SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = 2;