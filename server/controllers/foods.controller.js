const { foodsCollection } = require('../models/dbCollectionModel');
const { ObjectId } = require('mongodb');

// POST: create food
const createFood = async (req, res) => {
  try {
    const food = req.body;

    const result = await foodsCollection.insertOne(food);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Failed to create food',
      error,
    });
  }
};
// GET: all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodsCollection.find().toArray();
    res.send(foods);
  } catch (error) {
    res.status(500).send({
      message: 'Failed to get foods',
      error,
    });
  }
};
//Get: Single Data
const getSingleFood = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid food id' });
    }

    const food = await foodsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!food) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send(food);
  } catch (error) {
    res.status(500).send({
      message: 'Failed to fetch food',
      error,
    });
  }
};
//Put: update a Food data
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    //console.log(updatedData);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid food id' });
    }

    const result = await foodsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updatedData,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send({
      success: true,
      message: 'Food updated successfully',
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to update food',
      error,
    });
  }
};
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid food id' });
    }

    const result = await foodsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to delete food',
      error,
    });
  }
};
//category
const getFoodsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const result = await foodsCollection.find({ category }).toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load category foods' });
  }
};
//Popular
const getPopularFoods = async (req, res) => {
  try {
    const result = await foodsCollection.find({ type: 'popular' }).toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load popular foods' });
  }
};
//Regular
const getRegularFoods = async (req, res) => {
  try {
    const result = await foodsCollection.find({ type: 'regular' }).toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load regular foods' });
  }
};
//Offer
const getOfferFoods = async (req, res) => {
  try {
    const result = await foodsCollection.find({ type: 'offer' }).toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load regular foods' });
  }
};
// FastDelivery
const getFastDeliveryFoods = async (req, res) => {
  try {
    const result = await foodsCollection
      .find({ type: 'fastdelivery' })
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load fast delivery foods' });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
  getFoodsByCategory,
  getPopularFoods,
  getOfferFoods,
  getRegularFoods,
  getFastDeliveryFoods,
};
