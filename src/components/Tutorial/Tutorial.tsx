import React from 'react';
import { useState } from 'react';
import tutorialImage from './tutorial.png'

/**
 * Tutorial Button Component - Opens / Closes a Tutorial
 */
export const Tutorial: React.FC = () => {
  const [showTutorial, toggleShowTutorial] = useState(false);

  return (
  <div style={{border: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <button onClick={() => toggleShowTutorial(!showTutorial)} style={{marginBottom: '8px'}}>
      Tutorial
    </button>
    {showTutorial && <img src={tutorialImage} style={{width: '70%', border: '2px solid white', paddingBottom: '30px'}}></img>}
  </div>
  );
};
