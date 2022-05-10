import React from 'react';
import NewsItem from '../NewsItem/NewsItem';

import classes from './NewsList.module.scss';


const NewsList = ({ articles }) => {
  return (
    <ul className={classes['container']}>
      {articles.map((article) => (
        <NewsItem
          sourceName={article.sourceName}
          description={article.description}
          publishedAt={article.publishedAt}
          wordsCount={article.wordsCount}
          title={article.title}
          key={article._id} />))}
    </ul>
  );
};

NewsList.displayName = 'NewsList';
NewsList.defaultProps = {};

export default React.memo(NewsList);
