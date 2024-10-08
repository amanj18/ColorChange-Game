import React from 'react';
import Typo from '../typo';

const NoDataFound = ({ noDataThumb, noDataTitle, noDataCaption, noDataCta }) => {
  return (
    <>
      <div className='si-noData__wrap'>
        {noDataTitle && (
          <Typo transKey={''} component='h2' className='si-noData__title'>
            {noDataTitle}
          </Typo>
        )}
        {noDataCaption && (
          <Typo
            transKey={''}
            className='si-noData__caption'
            dangerouslySetInnerHTML={{ __html: noDataCaption }}
          ></Typo>
        )}
        {noDataThumb && (
          <div className='si-noData__thumb'>
            <img
              src={`${config.IMG_BASE_PATH}${noDataThumb}?v=${trans?.['img_version']}`}
              alt={noDataTitle}
            />
          </div>
        )}
        {noDataCta ? (
          <div className='si-noData__cta'>
            <CtaButton
              btnCls='si-btn si-btn__link'
              btnText={noDataCta}
              ariaLabel={noDataCta}
              {...noDataCta}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export { NoDataFound };
