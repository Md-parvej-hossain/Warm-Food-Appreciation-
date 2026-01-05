const { ObjectId } = require('mongodb');
const { paymentsCollection } = require('../models/dbCollectionModel');

const stripe = require('stripe')(process.env.PAYMENT_SERVER_KEY);

exports.createPayment = async (req, res) => {
  try {
    const price = Number(req.body.price);

    if (!price || price <= 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    const amountInCent = Math.round(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCent,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ message: 'Payment intent creation failed' });
  }
};

exports.paymentHistory = async (req, res) => {
  try {
    const paymentData = req.body;

    const result = await paymentsCollection.insertOne(paymentData);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Failed to create food',
      error,
    });
  }
};
exports.getPaymentHistory = async (req, res) => {
  try {
    const { email } = req.query;

    // Build query condition
    const query = email ? { email } : {};

    const paymentData = await paymentsCollection.find(query).toArray();
    res.send(paymentData);
  } catch (error) {
    res.status(500).send({
      message: 'Failed to get payment data',
      error,
    });
  }
};
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment ID',
      });
    }

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }
    const result = await paymentsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
