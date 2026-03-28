import React from 'react';

import { meal } from '../../constants';
import './Intro.css';

const Intro = () => {
  return (
    <div className="app__video">
      <video
        src={meal}
        type="video/mp4"
        loop
        autoPlay
        playsInline
        controls={false}
        muted
      />
      <div className="app__video-overlay" />
    </div>
  );
};

export default Intro;
