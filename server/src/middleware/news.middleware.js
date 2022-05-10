const moment = require('moment');
const NewsDB = require('../models/news.model');
const { SOURCE } = require('../utils/constants');
const newsService = require('../services/news.service');

const newsMiddleware = async (req, res, next) => {
  try {
    const { startDate, source = SOURCE } = req.query;
    const startDateFormat = moment(startDate);
    const endDate = newsService.getEndDate(startDate);
    const news = await NewsDB.find({
      $and: [
        { sourceId: source },
        { publishedAt: { $gte: endDate, $lte: startDateFormat } },
      ],
    });
    if (news && news.length > 0) {
      return res.status(200).send({
        success: true,
        message: 'Successfully retrieved news',
        data: {
          news,
        },
      });
    }
    next();
  } catch (err) {
    next();
  }
};

module.exports = {
  newsMiddleware,
};
