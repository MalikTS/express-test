const express = require('express');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middleware для разбора JSON (Критерий 1)
app.use(express.json());

// Подключение маршрутов
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

module.exports = app;