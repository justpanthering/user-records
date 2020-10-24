import React from 'react';

const userData = props => {
  return (
    <div>
      <span>{props.label}</span>
      <span>: </span>
      <span><strong>{props.value}</strong></span>
    </div>
  )
}

export default userData;