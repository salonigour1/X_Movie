import React from 'react';
import './Skeleton.css';
function SkeletonAvatar() {
  return (
    <div className='skeleton'>
      {[...Array(6)].map((curr) => (
        <div>
          <div className='skeleton-avatar'></div>
          <div className='skeleton-text'></div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonAvatar;
