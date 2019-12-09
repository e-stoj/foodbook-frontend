import React from 'react';
// import './styles.css';

const Local = ({ 
    type, 
    onCloseWindow, 
    onHandleLocalName, 
    onHandleLocalAddress, 
    onHandleLocalPhoneNumber,
    onChange,
    motives,
    onAddLocal,
    localName,
    localAddress,
    localPhoneNumber 
  }) => (
  <div className='add-local'>
    <div className='close-panel'>
      <button className='close-button' onClick={onCloseWindow}>X</button>
    </div>  
    <div>
      <span> Nazwa: </span> 
      <input onChange={onHandleLocalName} value={localName} />
    </div>
    <div>
      <span> Adres: </span>
      <input onChange={onHandleLocalAddress} value={localAddress} />
    </div>
    <div>
      <span> Numer telefonu: </span>
      <input onChange={onHandleLocalPhoneNumber} value={localPhoneNumber} />
    </div>
    <div className='motives-list'>
    { motives.map(motive => 
      <label>
        <input onChange={onChange} type='checkbox' value={motive} />
        {motive}
      </label>)}
    </div>
    <button className='login-button' onClick={onAddLocal}>{type}</button> 
  </div>
)

export default Local;