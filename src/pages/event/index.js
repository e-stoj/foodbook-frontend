import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faQuestion } from '@fortawesome/free-solid-svg-icons';
import _, { size } from 'lodash';
import { 
  getEventMessages, 
  getEventParticipants, 
  handleOpenEventPage, 
  addNewMessage,
  changeConfirmation } from '../../state/event';
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

  onChooseParticipationIcon = (confirmation) => {
    const { currentUser, event } = this.props;
    this.props.changeConfirmation(event.eventId, currentUser.userId, confirmation);
  }

  getCurrentSelection = (userId) => {
    const { confirmList } = this.props;
    for (let i = 0; i <= _.size(confirmList); i++) {
      console.log(confirmList[i]);
      if (confirmList[i]) {
        if (confirmList[i].user.userId === userId) {
          return confirmList[i].confirmation;
        }
      }
    }
  }

  render() {
    const { event, confirmList, participants, messages, currentUser} = this.props;
    return (
      <div className='event-page'>
        <div className='close-event-page'>
        {event.eventName}
        <button className='close-button' onClick={this.closeWindow}>X</button>
        </div>
        <div className='event'>
          <div className='participants-list'>
            <div>Uczestnicy spotkania:</div>
            {participants.map(participant => 
            <div className='confirm-participation'>
              <div className='name-and-surname'> 
                {participant.name} {participant.surname}
              </div>
              {participant.userId === currentUser.userId  ?
              <div className='confirmation-icons'>
                <FontAwesomeIcon 
                  className={this.getCurrentSelection(participant.userId) === 'BEDE' ? 'selected' : ''} 
                  icon = {faCheck} 
                  color={'green'} 
                  onClick={() => this.onChooseParticipationIcon('BEDE')} />
                <FontAwesomeIcon 
                  className={this.getCurrentSelection(participant.userId) === 'OCZEKUJACE' ? 'selected' : ''}
                  icon = {faQuestion} 
                  color={'yellow'} 
                  onClick={() => this.onChooseParticipationIcon('OCZEKUJACE')} />
                <FontAwesomeIcon 
                  className={this.getCurrentSelection(participant.userId) === 'NIE_BEDE' ? 'selected' : ''}
                  icon = {faTimes} 
                  color={'red'} 
                  onClick={() => this.onChooseParticipationIcon('NIE_BEDE')} /> 
              </div> 
              : 
              this.getCurrentSelection(participant.userId) === 'BEDE' ?
              <FontAwesomeIcon 
                icon = {faCheck} 
                color={'green'} />
              :
              this.getCurrentSelection(participant.userId) === 'OCZEKUJACE' ?
              <FontAwesomeIcon 
                icon = {faQuestion} 
                color={'yellow'} />
              :
              this.getCurrentSelection(participant.userId) === 'NIE_BEDE' ?
              <FontAwesomeIcon 
                icon = {faTimes} 
                color={'red'}  />
              : <div /> 
              }
            </div>)}
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
  addNewMessage, 
  changeConfirmation
};


export default connect(mapStateToProps, mapDispatchToProps)(Event);
