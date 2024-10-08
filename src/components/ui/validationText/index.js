import React from 'react';
import Typo from '../typo';

const ValidationText = ({ customCls, errMsg, transErrMsg }) => {
  return (
    <>
      <Typo
        transKey={transErrMsg}
        component={'div'}
        className={`si-errMsg ${customCls ? customCls : ''}`}
      >
        {errMsg}
      </Typo>
    </>
  );
};

export default ValidationText;
