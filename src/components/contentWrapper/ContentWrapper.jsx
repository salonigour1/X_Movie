import React, { Children } from 'react';
import './ContentWrapper.css';
function ContentWrapper({ children }) {
  return <div className='contentWrapper'>{children}</div>;
}

export default ContentWrapper;
