const { usersCollection } = require('../models/dbCollectionModel');
const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.user.email;
    //console.log(email);
    const user = await usersCollection.findOne({ email });

    if (!user || user.role !== 'Admin') {
      return res.status(403).send({ message: 'Forbidden: Admin only' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: 'Admin verification failed' });
  }
};

module.exports = verifyAdmin;
