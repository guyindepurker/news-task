const axios = require('axios');

const NewsDB = require('../models/news.model');
const newsService = require('../services/news.service');
const { SOURCE } = require('../utils/constants');

const getNews = async (req, res) => {
  try {
    const { startDate, source = SOURCE } = req.query;
    const dates = newsService.getLastSevenDays(startDate);
    const promisesNewsDates = [];
    for (let i = 0; i < dates.length; i++) {
      const currentDate = dates[i];
      const url = newsService.getBaseUrl(currentDate, source);
      promisesNewsDates.push(axios.get(url));
    }
    const resolvedNewsDates = await Promise.all(promisesNewsDates);
    const resolvedNewsDatesSuccessFiltered = resolvedNewsDates.filter((res) => {
      return (
        res.data.status === 'ok' &&
        res.data?.articles &&
        res.data.articles.length > 0
      );
    });
    if (
      !resolvedNewsDatesSuccessFiltered ||
      !resolvedNewsDatesSuccessFiltered.length
    ) {
      return res.status(404).send({
        success: false,
        message: 'failed to fetch data',
      });
    }
    const convertedResults = resolvedNewsDatesSuccessFiltered.map((result) =>
      newsService.extractDataFromApi(result.data)
    );
    await NewsDB.insertMany(convertedResults);
    res.status(200).send({
      success: true,
      message: 'Successfully retrieved news',
      data: {
        news: convertedResults,
      },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getNews,
};
