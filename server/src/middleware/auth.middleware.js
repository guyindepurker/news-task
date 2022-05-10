const jwt = require('jsonwebtoken');

const UserDB = require('../models/user.model');

const authUser = async (req, res, next) => {
  try {
    const tokenHeader = req.header('Authorization');
    const token = tokenHeader.replace('Bearer ', '');
    if (!token) {
      return res
        .status(400)
        .send({ success: false, message: 'Could not authenticate as a user' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserDB.findById({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({ message: 'Could not found a user' });
    }
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(406).send({ message: 'Please authenticate.' });
  }
};

module.exports = {
  authUser,
};
