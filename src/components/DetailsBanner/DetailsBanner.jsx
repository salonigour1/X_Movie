import React, { useEffect, useRef, useState } from 'react';
import './DetailBanner.css';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../../useFetch';
import { BsPlayCircle } from 'react-icons/bs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import Image from '../LazyLoadingImage/Image';
import posterFallBack from '../../assets/posterFallBack.png';
import dayjs, { Dayjs } from 'dayjs';
import GenreTemplate from '../GenreTemplate/GenreTemplate';
import CircularBar from '../CircularBar/CircularBar';
import Footer from '../../pages/footer/Footer';
import CastMember from '../CastSection/CastMember';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MediaContent from '../MediaContent/MediaContent';
import Trending from '../MediaContent/Trending';
import SkeletonBanner from '../Skeleton/SkeletonBanner';
import SkeletonAvatar from '../Skeleton/SkeletonAvatar';
import SkeletonCarousel from '../Skeleton/SkeletonCarousel';
function DetailsBanner() {
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: castData, loading: castLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: similarMovie, loading: similarLoading } = useFetch(
    `/${mediaType}/${id}/similar`
  );
  const { data: recommendedMovie, loading: recommendedLoading } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  console.log(similarMovie.results);

  const handleMinToHour = (min) => {
    if (min < 60) {
      return min + 'm';
    }
    const hour = Math.trunc(min / 60);
    const minutes = min - hour * 60;
    console.log(minutes);
    return hour + 'h ' + minutes + 'm';
  };
  const handleDirector = (data) => {
    if (!data) return;
    console.log(
      data.crew
        .filter((curr) => curr.job === 'Director')
        .map((curr) => curr.name)
    );
    let str = '';
    const a = data.crew
      .filter((curr) => curr.job === 'Director')
      .map((curr) => {
        str += curr.name + ', ';
        console.log(str);
        return curr.name;
      });

    return str.substring(0, str.trim().length - 1);
  };
  const handleWriter = (data) => {
    if (!data) return;
    console.log(
      data.crew
        .filter((curr) => curr.job === 'Director')
        .map((curr) => curr.name)
    );
    let str = '';
    const a = data.crew
      ?.filter(
        (curr) =>
          curr.job === 'Screenplay' ||
          curr.job === 'Story' ||
          curr.job === 'Writer'
      )
      .map((curr) => {
        str += curr.name + ', ';
        return curr.name;
      });

    return str.substring(0, str.trim().length - 1);
  };
  const castContainer = useRef();
  const handleNavigation = (dir) => {
    const container = castContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };
  console.log(loading && castLoading && similarLoading && recommendedLoading);
  return (
    <div className='detailBanner'>
      {loading && castLoading && similarLoading && recommendedLoading ? (
        <div>
          <SkeletonBanner />
          <SkeletonAvatar />
          <br />
          <br />
          <SkeletonCarousel />
        </div>
      ) : (
        <div className='detailBannerSkeleton'>
          <>
            {data && (
              <>
                <div className='backdrop-img'>
                  <Image
                    classname='bg'
                    src={url.backdrop + data.backdrop_path}
                  />
                </div>
                <div className='overlay'></div>
                <ContentWrapper>
                  <div className='content'>
                    <div className='top'>
                      <div className='left_posterImage'>
                        {data.poster_path ? (
                          <Image src={url.backdrop + data.poster_path} />
                        ) : (
                          <Image classname='poster' src={posterFallBack} />
                        )}
                      </div>
                      <div className='right_details'>
                        <div className='detailName'>
                          {`${
                            data.title || data.name || data.original_title
                          }(${dayjs(data.release_date).format('YYYY')})`}
                        </div>
                        <div className='detail_tagline'>{data.tagline}</div>
                        <div className='section'>
                          {data.genres.map((curr) => (
                            <GenreTemplate
                              name={`${curr.name}`}
                              key={curr.id}
                            />
                          ))}
                        </div>
                        <div className='section'>
                          <div className='detailCircularBar'>
                            <CircularBar
                              textcolor='white'
                              rating={data.vote_average.toFixed(1)}
                            />
                          </div>

                          <BsPlayCircle size='56px' />
                          <div className='watchTrailer'>Watch Trailer</div>
                        </div>

                        <div className='overviewHeading'>Overview</div>
                        <div className='overview'>{data.overview}</div>

                        <div className='section first'>
                          <div>
                            Status: <span>{data.status}</span>
                          </div>
                          <div>
                            Release Date:{' '}
                            <span>
                              {dayjs(data.release_date).format('MMM DD,YYYY')}
                            </span>
                          </div>
                          <div>
                            Runtime:{' '}
                            <span>{handleMinToHour(data.runtime)}</span>
                          </div>
                        </div>
                        <div className='line'></div>

                        <div className='second'>
                          Director: <span>{handleDirector(castData)}</span>
                        </div>

                        <div className='line'></div>
                        <div className='second'>
                          Writer: <span>{handleWriter(castData)}</span>
                        </div>

                        <div className='line'></div>
                      </div>
                    </div>
                    <br />
                    <div className='CastOuterContainer'>
                      <div className='headingCast'>Top Cast</div>
                      <div
                        className='testLeft'
                        onMouseOver={() => handleNavigation('left')}
                      >
                        <IoIosArrowBack size='40px' className='' />
                      </div>
                      <div
                        className='testRight'
                        onMouseOver={() => handleNavigation('right')}
                      >
                        <IoIosArrowForward size='40px' />
                      </div>
                      <div className='castMemberContainer' ref={castContainer}>
                        {castLoading ? (
                          <div>ok</div>
                        ) : (
                          castData.cast
                            .slice(0, 10)
                            .map((curr) => (
                              <CastMember
                                key={curr.credit_id}
                                castMemberData={curr}
                              />
                            ))
                        )}
                      </div>
                    </div>

                    {similarLoading || similarMovie.results.length === 0 ? (
                      <div style={{ color: 'red' }}>mmnsdjncs</div>
                    ) : (
                      <div className='similarMovies'>
                        <MediaContent
                          name="Similar Movie's"
                          firstTabData={similarMovie.results}
                          tabContent={[]}
                        />
                        {console.log(similarMovie)}
                      </div>
                    )}

                    {recommendedLoading ||
                    recommendedMovie.results.length === 0 ? (
                      <></>
                    ) : (
                      <div className='recommned similarMovies'>
                        <MediaContent
                          name='Recommended'
                          firstTabData={recommendedMovie.results}
                          tabContent={[]}
                        />
                      </div>
                    )}

                    <Footer />
                  </div>
                </ContentWrapper>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default DetailsBanner;
