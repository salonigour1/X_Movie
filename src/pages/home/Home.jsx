import React from 'react';
import './Home.css';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Header from '../header/Header';
import Trending from '../../components/MediaContent/Trending';
import Popular from '../../components/MediaContent/Popular';
import TopRated from '../../components/MediaContent/TopRated';
import { useDispatch, useSelector } from 'react-redux';
import MediaContent from '../../components/MediaContent/MediaContent';
import Footer from '../footer/Footer';
import SkeletonCarousel from '../../components/Skeleton/SkeletonCarousel';
import SkeletonBanner from '../../components/Skeleton/SkeletonBanner';
function Home() {
  const { popularSeries, popularMovies, popularLoading } = useSelector(
    (state) => state.popular
  );
  const { trendingDayWise, trendingWeekWise, loading } = useSelector(
    (state) => state.trending
  );
  const { topRatedLoading, topRatedMovies, topRatedSeries } = useSelector(
    (state) => state.topRated
  );

  return (
    <>
      {popularLoading && loading && topRatedLoading ? (
        <div>
          <SkeletonBanner />
          <SkeletonCarousel />
          <SkeletonCarousel />
        </div>
      ) : (
        <div className='container'>
          <HomeBanner />
          <div className='MediaOuterContainer'>
            <MediaContent
              name='Trending'
              firstTabData={trendingDayWise}
              secondTabData={trendingWeekWise}
              loading={loading}
              tabContent={['day', 'week']}
            />
            <MediaContent
              name="What's Popular"
              firstTabData={popularMovies}
              secondTabData={popularSeries}
              loading={popularLoading}
              tabContent={['Movies', 'TV Series']}
            />

            <MediaContent
              name='Top Rated'
              firstTabData={topRatedMovies}
              secondTabData={topRatedSeries}
              loading={topRatedLoading}
              tabContent={['Movies', 'TV Series']}
            />
          </div>
          <Footer />
        </div>
      )}
      ;
    </>
  );
}

export default Home;
