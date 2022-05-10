import React, { useState, useCallback } from 'react';
import { Button } from 'primereact/button';
import moment from 'moment';
import classes from './News.module.scss';
import { httpService } from '../../service/httpService';
import NewsList from './components/NewsList/NewsList';


const News = (props) => {
  console.log('news !');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(false)

  const loadNews = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await httpService.get(`/get-news?startDate=${date}`)
      setNewsList((prevState) => [...prevState, ...data.data.news])
      setDate(prevState => moment(prevState).subtract(1, 'week').format('YYYY-MM-DD'))
    } catch (err) {
      console.log('error', err);
    } finally {
      setLoading(false)
    }
  }, [date]);





  return (
    <div className={classes['container']}>
      <h1>Last News</h1>
      <Button className={classes['button']} onClick={loadNews} label="Load" loading={loading}></Button>
      {newsList.length > 0 && newsList.map(news => <NewsList key={news._id} articles={news.articles} />)}
    </div>
  );
};

News.displayName = 'News';
News.defaultProps = {};

export default React.memo(News);
