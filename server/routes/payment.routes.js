const express = require('express');
const {
  createPayment,
  paymentHistory,
  getPaymentHistory,
  updatePaymentStatus,
} = require('../controllers/payment.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/create-payment-intent', verifyToken, createPayment);
router.post('/paymentHistory', verifyToken, paymentHistory);
router.get('/paymentHistory', verifyToken, getPaymentHistory);
router.patch('/updatePaymentStatus/:id', verifyToken, updatePaymentStatus);

module.exports = router;
