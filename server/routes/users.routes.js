const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  requestRider,
  approveRider,
  deleteUser,
} = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const { usersCollection } = require('../models/dbCollectionModel');
const verifyAdmin = require('../middlewares/verifyAdnim');

// user routes
router.get('/users', verifyToken, verifyAdmin, getUsers);
router.post('/users', createUser);
router.put('/rider-request', verifyToken, requestRider);
router.patch('/approve-rider/:id', verifyToken, verifyAdmin, approveRider);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);

router.get('/users/role/:email', verifyToken, async (req, res) => {
  const user = await usersCollection.findOne({ email: req.params.email });
  res.send({ role: user?.role || 'user' });
});

module.exports = router;
