import React from 'react';
import './Image.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Image({ src, classname }) {
  return (
    <div className='Image'>
      <LazyLoadImage
        className={classname || ''}
        effect='blur'
        src={src}
        alt=''
      />
    </div>
  );
}

export default Image;
