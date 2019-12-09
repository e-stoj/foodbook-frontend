import React from 'react';
// import './styles.css';

const LoginFail = ({ closeWindow }) => (
  <div className='registration-fail'>
    <span> Błędny login lub hasło </span>
    <button className='login-button' onClick = {closeWindow}> OK </button>
  </div>
)

export default LoginFail;