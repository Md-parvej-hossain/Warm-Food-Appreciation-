const express = require('express');
const router = express.Router();
const {
  getAllFoods,
  createFood,
  getSingleFood,
  updateFood,
  deleteFood,
  getFoodsByCategory,
  getPopularFoods,
  getRegularFoods,
  getFastDeliveryFoods,
  getOfferFoods,
} = require('../controllers/foods.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdnim');

// routes
router.get('/foods', getAllFoods);
router.post('/foods', verifyToken, verifyAdmin, createFood);
router.get('/foods/popular', getPopularFoods);
router.get('/foods/regular', getRegularFoods);
router.get('/foods/offers', getOfferFoods);
router.get('/food/fastDelivery', getFastDeliveryFoods);
router.get('/foods/category/:category', getFoodsByCategory);
router.get('/foods/:id', getSingleFood);
router.put('/foods/:id', verifyToken, verifyAdmin, updateFood);
router.delete('/foods/:id', verifyToken, verifyAdmin, deleteFood);
module.exports = router;
