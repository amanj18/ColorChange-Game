import Typo from 'components/ui/typo';
import React from 'react';

const OverlayHeader = ({ title, titleTransKey, caption, captionTransKey }) => {
  return (
    <>
      <div className='si-popup__head'>
        {title && (
          <>
            <Typo transKey={titleTransKey} component='h2' className='si-popup__heading'>
              {title}
            </Typo>
          </>
        )}

        {caption && (
          <Typo transKey={captionTransKey} component='p' className='si-popup__heading-sub'>
            {caption}
          </Typo>
        )}
      </div>
    </>
  );
};

export default OverlayHeader;
