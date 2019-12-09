import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Event from '../event';
import { logout } from '../../state/session-user/index';
import { getUserEvents, handleOpenEventPage } from '../../state/event/index';
import { getUserFriends } from '../../state/user/index';
import './styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      event: {}
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
    console.log(event);
    this.props.handleOpenEventPage();
    this.setState({ event: event });
  }

  render() {
    const { activeUser, friends, events, showEventPage } = this.props;
    const { event } = this.state;
    console.log(activeUser);
    console.log(event);
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
              {friends.map(friend => <div className='friend'>{friend.name} {friend.surname}</div>)}
            </div>
            <div className='events'>
            {events.map(event => 
              <div onClick={() => this.goToEventPage(event)}>
                <h4>{event.eventName}</h4>
                <div>Data spotkania: {event.date}</div>
                <div>Godzina spotkania: {event.time}</div>
                <div>Miejsce: {event.local.name} </div>
              </div>
              )}
            </div>
          </div>
          {showEventPage && <Event event={event} />}
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  activeUser: state.sessionUser.activeUser,
  friends: state.user.friendsList,
  events: state.event.eventsList,
  showEventPage: state.event.showEventPage
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  logout: () => dispatch(logout()),
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  getUserFriends: (id) => dispatch(getUserFriends(id)),
  handleOpenEventPage: () => dispatch(handleOpenEventPage())
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
