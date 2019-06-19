import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { getUserFriends } from '../../state/user';
import { getAllMotives, getLocalsWithSelectedMotive, getAllLocals } from '../../state/locals';
import { logout } from '../../state/session-user/index';
import { addNewEvent } from '../../state/event/index';
import './styles.css';


class AddEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [this.props.currentUser.userId],
      date: '',
      time: '',
      eventName: '',
      motive: '',
      local: -1
    }
  }
  
  componentDidMount() {
    const currentUser = this.props.currentUser;
    this.props.getUserFriends(currentUser.userId);
    this.props.getAllMotives();
    this.props.getAllLocals();
  }

  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  onChange = (event) => {
    const participants = this.state.participants;
    if(event.target.checked === true) {
      participants.push(parseInt(event.target.value));
    } else {
      const index = participants.indexOf(parseInt(event.target.value))
      if (index !== -1) {
        participants.splice(index, 1);
      }
    }
    this.setState({ participants: participants });
  }

  getDate = (value) => {
    console.log(value.getYear());
    const month = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : `${value.getMonth() + 1}`; 
    const year = value.getYear() + 1900;
    console.log(year);
    const date = `${year}-${month}-${value.getDate()}`;
    console.log(date);
    this.setState({ date: date });
  }

  getTime = (time) => {
    this.setState({ time: time})
  }

  onHandleName = (event) => {
    this.setState({ eventName: event.target.value });
  }

  onLogout = () => {
    this.props.logout();
    this.goToAnotherPage('/login');
  }

  onMotiveChange = (event) => {
    this.setState({ motive: event.target.value });
    this.props.getLocalsWithSelectedMotive(event.target.value);
  }

  onLocalChange = (event) => {
    this.setState({ local: parseInt(event.target.value) });
    console.log(event.target.value);
  }

  onAddEvent = () => {
    const event = {
      date: this.state.date,
      time: this.state.time,
      eventName: this.state.eventName,
      motive: this.state.motive,
    }
    const query = `?ids=${this.state.participants}`;
    console.log(event);
    this.props.addNewEvent(this.state.local, event, query);
  }

  render() {
    const { friendsList, motives, filteredLocals, locals } = this.props;
    return (
      <div className='add-event-page'>
          <div className='header'>
            <span onClick={() => this.goToAnotherPage('/home')} > Strona główna </span>
            <span onClick={() => this.goToAnotherPage('/add-event')} > Stwórz wydarzenie </span>
            <span onClick={() => this.goToAnotherPage('/search')}> Szukaj znajomych </span>
            <span onClick={() => this.goToAnotherPage('/locals')}> Lista lokali </span> 
            <span onClick={this.onLogout}> Wyloguj </span>
          </div>
          <div className='add-event'>
            <div className='add-event-whole'>
            <div className='add-event-left'>
              <span className='add-event-span'>Nazwa</span>
              <input className='add-event-input' onChange={this.onHandleName} />
              <span className='add-event-span'>Data</span>
              <DatePicker
                onChange={this.getDate}
                format="y-MM-dd" />
              <span className='add-event-span'>Godzina</span>
              <TimePicker onChange={this.getTime} />
              <span className='add-event-span'>Motyw przewodni</span>
              <select onChange={this.onMotiveChange}>
                <option />
                {motives.map(motive => <option key={motive}>{motive}</option>)}
              </select>
              <span className='add-event-span'>Lokal</span>
              <select onChange={this.onLocalChange}>
                <option />
                {locals.map(local => <option value={local.localId}>{local.name}</option>)}
              </select>
            </div>
            <div className='add-event-right'>
              <span className='add-event-span'>Wybierz znajomych z listy</span>
              {friendsList.map(friend => (
                  <label key={friend.userId}>
                    <input onChange={this.onChange} type='checkbox' value={friend.userId} />
                    {friend.name} {friend.surname}
                  </label>
                ))}
            </div>
            </div>
            <button className='add-event-button' onClick={this.onAddEvent}>Dodaj</button>
          </div>
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  friendsList: state.user.friendsList,
  currentUser: state.sessionUser.activeUser,
  motives: state.locals.motivesList,
  filteredLocals: state.locals.filteredLocals,
  locals: state.locals.localsList,
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  getUserFriends: (id) => dispatch(getUserFriends(id)),
  getAllMotives: () => dispatch(getAllMotives()),
  logout: () => dispatch(logout()),
  getLocalsWithSelectedMotive: (motive) => getLocalsWithSelectedMotive(motive),
  getAllLocals: () => dispatch(getAllLocals()),
  addNewEvent: (localId, event, query) => dispatch(addNewEvent(localId, event, query))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage);
