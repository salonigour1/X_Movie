import React from 'react';
import './Skeleton.css';

const SkeletonBanner = () => {
  return (
    <div className='skeleton' style={{ paddingTop: '3rem' }}>
      <div className='skeleton-image'></div>
      <div>
        <div className='skeleton-text-100'></div>
        <div className='skeleton-text-50'></div>
        <br />
        <div className='skeleton-text-100'></div>
        <div className='skeleton-text-75'></div>
        <div className='skeleton-text-50'></div>
        <br />
        <div className='skeleton-text-100'></div>
        <div className='skeleton-text-100'></div>
      </div>
    </div>
  );
};

export default SkeletonBanner;
