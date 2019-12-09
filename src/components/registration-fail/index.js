import React from 'react';
import './styles.css';

const RegistrationFail = ({ closeWindow }) => (
  <div className='registration-fail'>
    <span> Użytkownik o podanym loginie lub e-mailu już istnieje </span>
    <button className='login-button' onClick = {closeWindow}> OK </button>
  </div>
)

export default RegistrationFail;