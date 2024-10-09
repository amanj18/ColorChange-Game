
import React ,{ forwardRef }  from 'react';

const Button = forwardRef((props, ref) => {

  return <button style={{width:"100px" , height:"100px" , margin:"1rem"}} ref={ref} {...props}> </button>;
});

export default Button;