import React, { useCallback } from 'react';
import { useEffect } from 'react';

const OverlayClose = ({
  onCancelClick = () => {
    return null;
  },
  onClickProp
}) => {
  useEffect(() => {
    const BODY_CLASS = 'noBodyScroll';
    document.body.classList.add(BODY_CLASS);
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.body.classList.remove(BODY_CLASS);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const escFunction = useCallback((event) => {}, []);
  return (
    <>
      <button className='si-popup__close' onClick={() => onClickProp()}>
        <i className='sii-close'></i>
      </button>
    </>
  );
};

export default OverlayClose;
