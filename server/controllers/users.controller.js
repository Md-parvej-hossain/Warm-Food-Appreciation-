const { ObjectId } = require('mongodb');
const { usersCollection } = require('../models/dbCollectionModel');

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Failed to get users' });
  }
};

// CREATE user
const createUser = async (req, res) => {
  try {
    const user = req.body;

    if (!user.email) {
      return res.status(400).send({ message: 'Email is required' });
    }

    const existingUser = await usersCollection.findOne({
      email: user.email,
    });

    if (existingUser) {
      return res.send({ message: 'User already exists' });
    }

    const result = await usersCollection.insertOne(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid User id' });
    }

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Food not found' });
    }

    res.send({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to delete User',
      error,
    });
  }
};
//rider req
const requestRider = async (req, res) => {
  try {
    const email = req.user.email; // from verifyToken
    const result = await usersCollection.updateOne(
      { email },
      {
        $set: {
          status: 'Pending',
        },
      }
    );
    res.send({
      success: true,
      message: 'Rider request sent successfully',
    });
  } catch (error) {
    res.status(500).send({ message: 'Failed to send rider request' });
  }
};
const approveRider = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role: 'Rider',
          status: 'Active',
        },
      }
    );
    res.send({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).send({ message: 'Failed to approve rider' });
  }
};

module.exports = {
  getUsers,
  createUser,
  requestRider,
  approveRider,
  deleteUser,
};
