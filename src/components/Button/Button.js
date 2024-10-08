import React from 'react'

const Button = ({className , id , type ,onclick }) => {
  return (
    <button className={className} id={id} type={type} onClick={onclick} style={{width: "100px" ,height:"100px" , margin:"1rem"}} > </button>
  )
}

export default Button