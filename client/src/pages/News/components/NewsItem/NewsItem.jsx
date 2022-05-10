import React from 'react';
import { Card } from 'primereact/card';
import moment from 'moment';
import classes from './NewsItem.module.scss';


const NewsItem = ({ title, wordsCount, publishedAt, sourceName, description }) => {
  const date = moment(publishedAt).format('YYYY-MM-DD');

  return (
    <li className={classes['container']}>
      <Card className={classes['card']} footer={<div className={classes['footer']}><span><span className={classes['bold']}> Words Count:</span> {wordsCount}</span> <span className={classes['source']}><span className={classes['bold']}>Source:</span> {sourceName}</span> </div>} title={title} subTitle={date}>
        <p className={classes['description']}>
          {description}
        </p>
      </Card>
    </li>
  );
};

NewsItem.displayName = 'NewsItem';
NewsItem.defaultProps = {};

export default React.memo(NewsItem);
