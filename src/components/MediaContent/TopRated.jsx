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
  getTopRatedLoading,
  getTopRatedSeries,
  getTopRatedMovies,
} from '../../redux/features/topRatedSlice';

function TopRated() {
  const [tvOrMovie, setTvOrMovie] = useState('movie');
  const { topRatedLoading, topRatedMovies, topRatedSeries } = useSelector(
    (state) => state.topRated
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(topRatedMovies);
  }, [topRatedMovies, topRatedSeries]);

  const handleTabClick = (curr) => {
    if (curr === 'TV Series') {
      setData(topRatedSeries);
      setTvOrMovie('tv');
    } else if (curr === 'Movies') {
      setData(topRatedMovies);
      setTvOrMovie('movie');
    }
  };

  return (
    <ContentWrapper>
      <div className='mediaContainer'>
        <div className='carousel_header'>
          <div className='carousel_title'>Top Rated</div>
          <ToggleTabs
            content={['Movies', 'TV Series']}
            handleTabClick={handleTabClick}
          />
        </div>
        <Carousel data={data} loading={topRatedLoading} />
      </div>
    </ContentWrapper>
  );
}
export default TopRated;
