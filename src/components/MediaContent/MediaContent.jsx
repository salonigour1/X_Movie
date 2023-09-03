import React, { useRef } from 'react';
import './MediaContent.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ToggleTabs from '../ToggleTabs/ToggleTabs';
import Carousel from '../Carousel/Carousel';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {
  getPopularLoading,
  getPopularSeries,
  getPopularMovies,
} from '../../redux/features/popularSlice';

function MediaContent({
  name,
  firstTabData,
  secondTabData,
  loading,
  tabContent,
}) {
  const [tabContentButton, setTabContentButton] = useState();
  const [data, setData] = useState({ mediaType: '', mediaData: [] });
  useEffect(() => {
    setData({ mediaType: 'movie', mediaData: firstTabData });
  }, [firstTabData, secondTabData]);

  const handleTabClick = (curr) => {
    if (curr === 'TV Series') {
      setData({ mediaType: 'tv', mediaData: secondTabData });
      setTabContentButton('tv');
    } else if (curr === 'Movies') {
      setData({ mediaType: 'movie', mediaData: firstTabData });
      setTabContentButton('movie');
    } else if (curr === 'day') {
      setData({ mediaType: 'movie', mediaData: firstTabData });
      setTabContentButton('day');
    } else if (curr === 'week') {
      setData({ mediaType: 'tv', mediaData: secondTabData });
      setTabContentButton('week');
    }
  };

  return (
    <ContentWrapper>
      <div className='mediaContainer'>
        <div className='carousel_header'>
          <div className='carousel_title'>{name}</div>
          <ToggleTabs content={tabContent} handleTabClick={handleTabClick} />
        </div>
        <Carousel
          data={data.mediaData}
          loading={loading}
          mediaType={data.mediaType}
        />
      </div>
    </ContentWrapper>
  );
}
export default MediaContent;
