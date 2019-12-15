import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Event from '../event';
import EventForm from '../../components/event-form';
import { logout } from '../../state/session-user/index';
import { 
  getUserEvents,
  handleOpenEventPage, 
  updateEvent, 
  deleteEvent, 
  getConfirmationsOfEvent } from '../../state/event/index';
import { getAllMotives, getLocalsWithSelectedMotive, getAllLocals } from '../../state/locals';
import { getUserFriends, deleteFriend } from '../../state/user/index';
import './styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      event: {},
      showEditEventWindow: false,
      date: '',
      time: '',
      eventName: '',
      motive: '',
      local: -1,
    }
  }

  componentDidMount() {
    const id = this.props.activeUser.userId;
    this.props.getUserEvents(id);
    this.props.getUserFriends(id);
  }
  
  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  onLogout = () => {
    this.props.logout();
    this.goToAnotherPage('/login');
  }

  goToEventPage = (event) => {
    this.props.getConfirmationsOfEvent(event.eventId);   
    this.props.handleOpenEventPage();
    this.setState({ event: event });
  }

  onShowEditEventWindow = (event, e) => {
    e.stopPropagation();
    this.props.getAllMotives();
    this.props.getAllLocals();
    this.setState({ 
      showEditEventWindow: true, 
      event: event,
      date: event.date,
      time: event.time,
      eventName: event.eventName,
      motive: event.motive,
      local: event.local });

  }

  onCloseEditEventWindow = () => {
    this.setState({ showEditEventWindow: false });
  }

  getDate = (value) => {
    const month = value.getMonth() + 1 < 10 ? `0${value.getMonth() + 1}` : `${value.getMonth() + 1}`; 
    const year = value.getYear() + 1900;
    const date = `${year}-${month}-${value.getDate()}`;
    this.setState({ date: date });
  }

  getTime = (time) => {
    this.setState({ time: time})
  }

  onHandleName = (event) => {
    this.setState({ eventName: event.target.value });
  }

  onMotiveChange = (event) => {
    this.setState({ motive: event.target.value });
    this.props.getLocalsWithSelectedMotive(event.target.value);
  }

  onLocalChange = (event) => {
    this.setState({ local: parseInt(event.target.value) });
  }

  onUpdateEvent = () => {
    const newEvent = {
      date: this.state.date,
      time: this.state.time,
      eventName: this.state.eventName,
      motive: this.state.motive,
      local: this.state.local
    }
    this.props.updateEvent(this.state.event.eventId, newEvent);
    this.onCloseEditEventWindow();
  }

  onDeleteEvent = (event, e) => {
    e.stopPropagation();
    const { activeUser } = this.props;
    this.props.deleteEvent(event.eventId, activeUser.userId);
  }

  onDeleteFriend = (friend) => {
    const { activeUser } = this.props;
    this.props.deleteFriend(activeUser.userId, friend);
  }

  render() {
    const { activeUser, friends, events, showEventPage, motives, locals, confirmations } = this.props;
    const { event, showEditEventWindow, date, time, eventName, motive, local } = this.state;
    return (
      <div className='home-page'>
          <div className='header'>
            <span onClick={() => this.goToAnotherPage('/home')} > Strona główna </span>
            <span onClick={() => this.goToAnotherPage('/add-event')} > Stwórz wydarzenie </span>
            <span onClick={() => this.goToAnotherPage('/search')}> Szukaj znajomych </span>
            <span onClick={() => this.goToAnotherPage('/locals')}> Lista lokali </span> 
            <span onClick={this.onLogout}> Wyloguj </span>
          </div>
          <div className='home'>
            <div className='friends-list'>
              <span>Lista znajomych użytkownika { activeUser.name } {activeUser.surname}</span>
              {friends.map(friend => 
              <div> 
                <div className='friend'>{friend.name} {friend.surname}</div> 
                <FontAwesomeIcon icon = {faTrashAlt} onClick={() => this.onDeleteFriend(friend)} /> 
              </div>)}
            </div>
            <div className='events'>
            {events.map(event => 
              <div onClick={() => this.goToEventPage(event)}>
                <div className='event-header'>
                  <h4>{event.eventName}</h4>
                  <div className='activities-buttons'>
                    <FontAwesomeIcon icon = {faEdit} onClick={(e) => this.onShowEditEventWindow(event, e)} />
                    <FontAwesomeIcon icon = {faTrashAlt} onClick={(e) => this.onDeleteEvent(event, e)} />
                  </div>
                </div>
                <div>Data spotkania: {event.date}</div>
                <div>Godzina spotkania: {event.time}</div>
                <div>Miejsce: {event.local.name} </div>
              </div>
              )}
            </div>
          </div>
          {showEventPage && <Event event={event} confirmList={confirmations} />}
          {showEditEventWindow && 
          <div className = 'edit-event-window'>
            <EventForm 
              type = 'Edytuj'
              onHandleName = {this.onHandleName} 
              getDate = {this.getDate}
              getTime = {this.getTime} 
              onMotiveChange = {this.onMotiveChange}
              motives = {motives} 
              onLocalChange = {this.onLocalChange}
              locals = {locals}
              friendsList = {this.friends}
              buttonEvent = {this.onUpdateEvent}
              name = {eventName}
              date = {date} 
              time = {time}
              eventMotive = {motive}
              eventLocal = {local} /> 
          </div>
          }
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  activeUser: state.sessionUser.activeUser,
  friends: state.user.friendsList,
  events: state.event.eventsList,
  showEventPage: state.event.showEventPage,
  motives: state.locals.motivesList,
  locals: state.locals.localsList,
  confirmations: state.event.confirmations
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  logout: () => dispatch(logout()),
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  getUserFriends: (id) => dispatch(getUserFriends(id)),
  handleOpenEventPage: () => dispatch(handleOpenEventPage()),
  getLocalsWithSelectedMotive: (motive) => getLocalsWithSelectedMotive(motive),
  getAllLocals: () => dispatch(getAllLocals()),
  getAllMotives: () => dispatch(getAllMotives()),
  updateEvent: (id, event) => dispatch(updateEvent(id, event)),
  deleteEvent: (id) => dispatch(deleteEvent(id)),
  getConfirmationsOfEvent: (eventId) => dispatch(getConfirmationsOfEvent(eventId)),
  deleteFriend: (id, friend) => dispatch(deleteFriend(id, friend))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
