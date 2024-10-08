import React from 'react';
import Typo from '../typo';
import Anchor from '../anchor';

const SocialShare = ({ title, titleTransKey, data }) => {
  return (
    <>
      <div className='si-socialShare'>
        <Typo transKey={titleTransKey} component='h3' className='si-socialShare__title'>
          {title}
        </Typo>
        <div className='si-socialShare__icons'>
          {data.map((item, index) => (
            <Anchor
              key={index}
              hyperLink={item.link}
              classes={`si-social__icon ${item.iconName}`}
              iconCls={item.iconCls}
              variant={'onlyIcon'}
            ></Anchor>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialShare;
