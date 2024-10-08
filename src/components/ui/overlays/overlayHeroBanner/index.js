import Media from 'components/ui/media';
import Typo from 'components/ui/typo';
import React from 'react';

const OverlayHeroBanner = ({ imgProps }) => {
  return (
    <>
      <div className='si-popup__heroBanner'>
        <Media {...imgProps} />
      </div>
    </>
  );
};

export default OverlayHeroBanner;
