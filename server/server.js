require('dotenv').config();
const express = require('express');
const db = require('./db');
const morgan = require('morgan');

const app = express();

// GLOBAL MIDDLEWARES
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // add json to body of the req

// ROUTING
// Get All Restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants;');

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

// Get One Restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM restaurants WHERE id = $1', [
      req.params.id,
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

// Create A Restaurant
app.post('/api/v1/restaurants/', async (req, res) => {
  try {
    const newRestaurant = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) RETURNING *;',
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: 'success',
      data: {
        restaurant: newRestaurant.rows[0],
      },
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

// Update A Restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const updated = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: updated.rows[0],
      },
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

// Delete A Restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM restaurants WHERE id = $1;', [req.params.id]);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Server is up and listening on port ${port}`)
);
