import React, { useState } from 'react';
import './ToggleTabs.css';

function ToggleTabs({ content, handleTabClick }) {
  const [active, setActive] = useState(content[0]);

  const handleClick = (curr) => {
    setActive(curr);
    handleTabClick(curr);
  };

  return content.length !== 0 ? (
    <div className='toggleTabs'>
      {content.map((curr) => (
        <button
          key={curr}
          className={curr === active ? `TabButton active` : `TabButton`}
          onClick={(e) => handleClick(curr)}
        >
          {curr}
        </button>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

export default ToggleTabs;
