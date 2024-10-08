import React from 'react';
import { IMAGE_VERSION } from 'utils/constants';

const Media = ({ imgSrc, imgAlt, restProp }) => {
  return (
    <>
      <img src={`${imgSrc}?v=${IMAGE_VERSION}`} alt={imgAlt} loading='lazy' {...restProp} />
    </>
  );
};

export default Media;
