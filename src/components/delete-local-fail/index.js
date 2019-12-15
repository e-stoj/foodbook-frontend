import React from 'react';

const DeleteLocalFail = ({ closeWindow }) => (
  <div className='registration-fail'>
    <span> Nie można usunąć, w lokalu stworzone jest wydarzenie </span>
    <button className='login-button' onClick = {closeWindow}> OK </button>
  </div>
)

export default DeleteLocalFail;