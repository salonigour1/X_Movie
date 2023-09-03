import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../useFetch';
import Image from '../LazyLoadingImage/Image';
import './style.css';
import ContentWrapper from '../contentWrapper/ContentWrapper';

function HomeBanner() {
  const [background, setBackground] = useState('');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { data, loading } = useFetch('/movie/upcoming');
  const { url } = useSelector((state) => state.home);

  //   console.log(data?.results[0]?.backdrop_path);
  useEffect(() => {
    if (!data) return;
    const bg =
      url.backdrop +
        data?.results[Math.floor(Math.random() * 20)]?.backdrop_path ?? '';
    setBackground(bg);
    console.log(bg);
  }, [data]);

  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`search/${query}`);
    }
  };
  return (
    <div className='heroBanner'>
      <div className='bg_image'>
        {!loading && <Image src={background} classname='background_image' />}
      </div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <div className='topContent'>
            <div className='title'>Welcome.</div>

            <div className='subtitle'>
              Millions of movies, TV shows and people to discover. Explore now.
            </div>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie or tv shows...'
                onKeyUp={handleSearchQuery}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HomeBanner;
