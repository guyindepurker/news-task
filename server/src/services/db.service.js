// mongodb://localhost:27017
const mongoose = require('mongoose');
const { logger } = require('./logger.service');
const UserDB = require('../models/user.model');

class DBService {
  static connect() {
    mongoose
      .connect(process.env.MONGO_DB_SERVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logger.info('MongoDB connection established successfully');
        DBService.initUser();
      })
      .catch((e) => logger.error(`MongoDB connection failed with ERROR: ${e}`));
  }

  static async initUser() {
    await UserDB.deleteOne({ userName: 'admin' });
    const newUser = {
      userName: 'admin',
      password: '1234',
      name: 'Guy',
    };
    const user = new UserDB(newUser);
    await user.save();
    logger.info('USER CREATED successfully');
  }
}

module.exports = {
  DBService,
};
