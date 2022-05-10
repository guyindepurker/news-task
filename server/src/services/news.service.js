const moment = require('moment');
const { baseUrlApiNews, SOURCE } = require('../utils/constants');

const countWords = (title, description) => title.length + description.length;

const getLastSevenDays = (startDate) => {
  const maxDays = 7;
  const dates = [];

  for (let i = 0; i <= maxDays; i++) {
    console.log({ i });
    const currentDate = moment(startDate)
      .subtract(i, 'day')
      .format('YYYY-MM-DD');
    dates.push(currentDate);
  }
  console.log({ dates });
  return dates;
};

const getEndDate = (startDate) => moment(startDate).subtract(1, 'week');

const getBaseUrl = (date, sources = SOURCE) =>
  `${baseUrlApiNews}&sources=${sources}&to=${date}&from=${date}`;

const extractDataFromApi = (response) => {
  let date = null;
  let sourceId = null;
  const convertedArticles = response.articles.map((article) => {
    const { source, title, description, publishedAt } = article;

    if (!date) {
      date = moment(publishedAt);
    }

    if (!sourceId) {
      sourceId = source.id;
    }

    const wordsCount = countWords(title, description);
    const finalNewsObject = {
      sourceName: source.name,
      title,
      description,
      wordsCount,
      publishedAt,
    };
    return finalNewsObject;
  });
  return { publishedAt: date, sourceId, articles: convertedArticles };
};

module.exports = {
  countWords,
  getLastSevenDays,
  getBaseUrl,
  extractDataFromApi,
  countWords,
  getEndDate,
};
