const { client } = require('../config/db');

const DB = client.db('warmFood');

const usersCollection = DB.collection('users');
const foodsCollection = DB.collection('foods');
const paymentsCollection = DB.collection('payment');

module.exports = {
  usersCollection,
  foodsCollection,
  paymentsCollection,
};
