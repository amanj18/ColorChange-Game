import React, { useRef } from 'react';
import OverlayFooter from './overlayFooter';
import OverlayHeader from './overlayHeader';
import OverlayClose from './overlayClose';
import OverlayHeroBanner from './overlayHeroBanner';
// import OverlayClose from "./overlayClose";

function Overlays({ overlayName, overlayConfig, children }) {
  const {
    noOverlayClose = true,
    noOverlayHeroBanner = false,
    noOverlayHead = true,
    noOverlayBody = true,
    noOverlayFoot = true,
    noOverlayReset = true,
    onClickProp
  } = overlayConfig || {};

  return (
    <>
      <div
        className={`si-popup__wrap ${
          overlayName ? `si-popup__wrap--${overlayName}` : ''
        } si-fade in`}
      >
        {/* in | out */}
        <div className='si-popup__container'>
          {noOverlayClose && <OverlayClose onClickProp={onClickProp} />}
          {noOverlayHeroBanner && <OverlayHeroBanner {...overlayConfig} />}
          {noOverlayHead && <OverlayHeader {...overlayConfig} />}
          {noOverlayBody && <div className='si-popup__body'>{children}</div>}
          {noOverlayFoot && <OverlayFooter {...overlayConfig} />}
        </div>
      </div>
    </>
  );
}

export { Overlays };
