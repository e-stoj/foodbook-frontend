import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getEventMessages, getEventParticipants, handleOpenEventPage, addNewMessage } from '../../state/event';
import './styles.css';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.getEventMessages(this.props.event.eventId);
    this.props.getEventParticipants(this.props.event.eventId);
  }

  closeWindow = () => {
    this.props.handleOpenEventPage()
  }

  getMessageText = (event) => {
    console.log(event.target.value);
    this.setState({ text: event.target.value });
  }

  sendMessage = () => {
    this.props.addNewMessage(this.props.event.eventId, this.props.currentUser.userId, this.state);
    this.setState({ text: '' });
    this.props.getEventMessages(this.props.event.eventId);
  }

  render() {
    const { event, participants, messages } = this.props;
    console.log(event);
    return (
      <div className='event-page'>
        <div className='close-event-page'>
        {event.eventName}
        <button className='close-button' onClick={this.closeWindow}>X</button>
        </div>
        <div className='event'>
          <div className='participants-list'>
          <div>Uczestnicy spotkania:</div>
          {participants.map(participant => <div> {participant.name} {participant.surname}</div>)}
          </div>
          <div className='messages'>
          {messages.map(message => 
          <div className='message'>{message.user.login}: {message.text}</div>
          )}
          <textarea onChange={this.getMessageText} className='text-area'></textarea>
          <button className='login-button' onClick={this.sendMessage}>Wyślij wiadomość</button>
          </div>
          
        </div>
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  participants: state.event.participants,
  messages: state.event.messages,
  currentUser: state.sessionUser.activeUser
});

const mapDispatchToProps = {
  getEventParticipants,
  getEventMessages,
  handleOpenEventPage,
  addNewMessage
};


export default connect(mapStateToProps, mapDispatchToProps)(Event);
