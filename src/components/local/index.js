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
    name, 
    address,
    phoneNumber,
    selectedMotives
  }) => (
  <div className='add-local'>
    <div className='close-panel'>
      <button className='close-button' onClick={onCloseWindow}>X</button>
    </div>  
    <div>
      <span> Nazwa: </span> 
      <input onChange={onHandleLocalName} value={name} />
    </div>
    <div>
      <span> Adres: </span>
      <input onChange={onHandleLocalAddress} value={address} />
    </div>
    <div>
      <span> Numer telefonu: </span>
      <input onChange={onHandleLocalPhoneNumber} value={phoneNumber} />
    </div>
    <div className='motives-list'>
    { motives.map(motive => 
      <label>
        <input onChange={onChange} type='checkbox' value={motive} checked = {selectedMotives.find((m) => m === motive)} />
        {motive}
      </label>)}
    </div>
    <button className='login-button' onClick={onAddLocal}>{type}</button> 
  </div>
)

export default Local;