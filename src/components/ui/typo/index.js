import React from 'react';
const Typo = ({ component, transKey, children, ...props }) => {
  const CustomTag = component;

  return (
    <CustomTag
      dangerouslySetInnerHTML={{
        __html: transKey ? window?.['translations']?.[transKey] ?? children : children
      }}
      {...props}
    ></CustomTag>
  );
};

export default Typo;
