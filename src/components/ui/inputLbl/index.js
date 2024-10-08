import React from 'react';
import Typo from '../typo';

const InputLabel = ({ inputID, hiddenLabel, inputLbl, transInputLbl }) => {
  return (
    <>
      {!hiddenLabel ? (
        <Typo transKey={transInputLbl} component='label' className='si-lbl' htmlFor={inputID}>
          {inputLbl}
        </Typo>
      ) : (
        ''
      )}
    </>
  );
};

export default InputLabel;
