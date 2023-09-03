import React, { useRef } from 'react';
import './MediaContent.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';

import useFetch from '../../useFetch';
import ToggleTabs from '../ToggleTabs/ToggleTabs';
import Carousel from '../Carousel/Carousel';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {
  getPopularLoading,
  getPopularSeries,
  getPopularMovies,
} from '../../redux/features/popularSlice';

function Popular() {
  const [tvOrMovie, setTvOrMovie] = useState('movie');
  const { popularSeries, popularMovies, popularLoading } = useSelector(
    (state) => state.popular
  );
  const [data, setData] = useState([]);
  //   console.log(trendingDayWise, trendingWeekWise, data, loading);
  console.log(popularSeries, popularLoading, popularMovies);

  useEffect(() => {
    setData(popularMovies);
  }, [popularSeries, popularMovies]);

  const handleTabClick = (curr) => {
    if (curr === 'TV Series') {
      setData(popularSeries);
      setTvOrMovie('tv');
    } else if (curr === 'Movies') {
      setData(popularMovies);
      setTvOrMovie('movie');
    }
  };

  return (
    <ContentWrapper>
      <div className='mediaContainer'>
        <div className='carousel_header'>
          <div className='carousel_title'>What's Popular</div>
          <ToggleTabs
            content={['Movies', 'TV Series']}
            handleTabClick={handleTabClick}
          />
        </div>
        <Carousel data={data} loading={popularLoading} />
      </div>
    </ContentWrapper>
  );
}
export default Popular;
