import React from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

const EventForm = ({
  type,
  onHandleName, 
  getDate, 
  getTime, 
  onMotiveChange, 
  motives, 
  onLocalChange, 
  locals, 
  friendsList, 
  onChange,
  buttonEvent,
  name,
  date, 
  time,
  eventMotive,
  eventLocal
}) => (
  <div className={type === 'Dodaj' && 'add-event'}>
  <div className='add-event-whole'>
  <div className='add-event-left'>
    <span className='add-event-span'>Nazwa</span>
    <input className='add-event-input' onChange={onHandleName} value={name} />
    <span className='add-event-span'>Data</span>
    <DatePicker
      onChange={getDate}
      format="y-MM-dd"
      value={date} />
    <span className='add-event-span'>Godzina</span>
    <TimePicker onChange={getTime} value={time} />
    <span className='add-event-span'>Motyw przewodni</span>
    <select onChange={onMotiveChange}>
      <option />
      {motives && motives.map(motive => 
        <option key={motive} selected = {motive === eventMotive && 'selected'}> {motive} </option>)}
    </select>
    <span className='add-event-span'>Lokal</span>
    <select onChange={onLocalChange}>
      <option />
      {locals && locals.map(local => 
      <option value={local.localId} selected = {type === 'Edytuj' && local.localId === eventLocal.localId && 'selected'}> 
        {local.name} 
      </option>)}
    </select>
  </div>
  {type === 'Dodaj' && 
  <div className='add-event-right'>
    <span className='add-event-span'>Wybierz znajomych z listy</span>
    {friendsList && friendsList.map(friend => (
        <label key={friend.userId}>
          <input onChange={onChange} type='checkbox' value={friend.userId} />
          {friend.name} {friend.surname}
        </label>
      ))}
  </div>
  }
  </div>
  <button className='add-event-button' onClick = {buttonEvent}> {type} </button>
</div>
)

export default EventForm;
