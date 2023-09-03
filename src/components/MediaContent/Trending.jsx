import React, { useRef } from 'react';
import './MediaContent.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import {
  getLoading,
  getTrendingApiDayWise,
  getTrendingApiWeekWise,
} from '../../redux/features/trendingSlice';
import useFetch from '../../useFetch';
import ToggleTabs from '../ToggleTabs/ToggleTabs';
import Carousel from '../Carousel/Carousel';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {
  getPopularLoading,
  getPopularSeries,
  getPopularMovies,
} from '../../redux/features/popularSlice';

function Trending() {
  // const dispatch = useDispatch();
  // const [content, setContent] = useState([]);
  const [dayOrWeek, setDayOrWeek] = useState('day');
  // const { data, loading } = useFetch(`/trending/all/${dayOrWeek}`);
  const { trendingDayWise, trendingWeekWise, loading } = useSelector(
    (state) => state.trending
  );
  const { popularSeries, popularMovies, popularLoading } = useSelector(
    (state) => state.popular
  );
  const [data, setData] = useState([]);
  console.log(trendingDayWise, trendingWeekWise, data, loading);
  console.log(popularSeries, popularLoading, popularMovies);

  useEffect(() => {
    setData(trendingDayWise);
    // dispatch(getLoading(false));
    // if (
    //   trendingDayWise.length != 0 &&
    //   trendingWeekWise.length != 0 &&
    //   data.length != 0
    // ) {
    //   console.log('--her-----');
    //   dispatch(getLoading(false));
    // }
  }, [trendingDayWise, trendingWeekWise]);

  const handleTabClick = (curr) => {
    if (curr === 'day') {
      setData(trendingDayWise);
      setDayOrWeek('day');
    } else if (curr === 'week') {
      setData(trendingWeekWise);
      setDayOrWeek('week');
    }
  };

  return (
    <ContentWrapper>
      <div className='mediaContainer'>
        <div className='carousel_header'>
          <div className='carousel_title'>Trending</div>
          <ToggleTabs
            content={['day', 'week']}
            handleTabClick={handleTabClick}
          />
        </div>
        <Carousel data={data} loading={loading} />
      </div>
    </ContentWrapper>
  );
}
export default Trending;
