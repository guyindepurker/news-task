const jwt = require('jsonwebtoken');

const UserDB = require('../models/user.model');

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res.status(400).send({ message: 'Please provide all the fields.' });
    }

    const user = await UserDB.findByCredentials(userName, password);
    const token = await user.generateAuthToken();
    res.status(200).send({
      message: 'Login successful.',
      data: { token, user: user.toJSON() },
    });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
};

const autoLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .send({ message: 'Please provide all the fields.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserDB.findById({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({ message: 'Could not found a user' });
    }
    const newToken = user.generateAuthToken();
    res.status(200).send({
      success: true,
      message: 'autoLogin successfully',
      data: { user: user.toJSON(), token: newToken },
    });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
};

module.exports = {
  autoLogin,
  login,
};
