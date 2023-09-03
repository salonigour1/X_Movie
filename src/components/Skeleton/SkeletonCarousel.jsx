import './Skeleton.css';
import React from 'react';

function SkeletonCarousel() {
  return (
    <div className='skeleton' style={{ padding: '0rem 2rem' }}>
      {[...Array(6)].map((curr) => (
        <div className='skeleton-posterImage'></div>
      ))}
    </div>
  );
}

export default SkeletonCarousel;
