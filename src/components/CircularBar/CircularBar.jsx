import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CircularBar.css';
function CircularBar({ rating, textcolor }) {
  return (
    <div className='circularRating'>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        // textSize={'20px'}
        styles={buildStyles({
          pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
          textSize: '40px',
          textColor: `${textcolor}`,
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );
}

export default CircularBar;
