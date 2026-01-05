const { usersCollection } = require('../models/dbCollectionModel');

const verifyRider = async (req, res, next) => {
  try {
    const email = req.user.email;
    const user = await usersCollection.findOne({ email });

    if (!user || user.role !== 'Rider') {
      return res.status(403).send({ message: 'Forbidden: Rider only' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: 'Rider verification failed' });
  }
};

module.exports = verifyRider;
