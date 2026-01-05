const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users.routes');
const foodsRoutes = require('./routes/foods.routes');
const authRoutes = require('./routes/auth.routes');
const paymentRoutes = require('./routes/payment.routes');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://auth-itegration-6dfcc.web.app',
    ],
    credentials: true,
  })
);

// routes
app.use('/api', userRoutes);
app.use('/api', foodsRoutes);
app.use('/api', authRoutes);
app.use('/api', paymentRoutes);

// health check
app.get('/', (req, res) => {
  res.send('Hello from Warm Food Server..');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
    path: req.originalUrl,
  });
});

module.exports = app;
