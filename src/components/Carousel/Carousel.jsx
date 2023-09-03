import React from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import dayjs from 'dayjs';
import PosterFallback from '../../assets/posterFallBack.png';
import Image from '../LazyLoadingImage/Image';
import './Carousel.css';
import CircularBar from '../CircularBar/CircularBar';

function Carousel({ data, loading, mediaType }) {
  const { url } = useSelector((state) => state.home);
  const carouselContainer = useRef();

  const navigate = useNavigate();
  const handleNavigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };
  const getName = (title, name) => {
    let movie_name;
    if (title) {
      movie_name = title;
    } else {
      movie_name = name;
    }
    const m_length = movie_name?.length;
    if (movie_name) {
      if (m_length < 15) {
        return movie_name;
      } else {
        return movie_name.substring(0, 16) + '...';
      }
    } else {
      return movie_name;
    }
  };
  return (
    <div className='carousel'>
      <ContentWrapper>
        <div onMouseOver={() => handleNavigation('left')}>
          <IoIosArrowBack size='40px' className='left' />
        </div>
        <div onMouseOver={() => handleNavigation('right')}>
          <IoIosArrowForward size='40px' className='right' />
        </div>

        {!loading ? (
          <div className='carouselItems' ref={carouselContainer}>
            {data.map((curr) => {
              const imgUrl = curr.poster_path
                ? url.poster + curr.poster_path
                : PosterFallback;
              return (
                <div
                  className='carouselItem'
                  key={curr.id}
                  onClick={() =>
                    navigate(
                      `/${curr.media_type ? curr.media_type : mediaType}/${
                        curr.id
                      }`
                    )
                  }
                >
                  <Image src={imgUrl} classname='carouselImage' />
                  <div className='circleBar'>
                    <CircularBar
                      textcolor='black'
                      rating={curr.vote_average.toFixed(1)}
                    />
                  </div>

                  <div className='block'>
                    <div className='textBox'>
                      {getName(curr?.title, curr?.name)}
                    </div>
                    <div className='date'>
                      {dayjs(curr.release_date).format('MMM D, YYYY')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <span>...Loading</span>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
