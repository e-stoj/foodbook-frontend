import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RegistrationFail from '../../components/registration-fail';
import { register, closeRegistrationFailWindow } from '../../state/session-user';
import './styles.css';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      login: '',
      password: '',
      email: ''
    }
  }
  
  onHandleName = (event) => {
    this.setState({ name: event.target.value });
  }

  onHandleSurname = (event) => {
    this.setState({ surname: event.target.value });
  }

  onHandleLogin = (event) => {
    this.setState({ login: event.target.value });
  }

  onHandlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onHandleEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onRegister = () => {
    const user = this.state;
    this.props.register(user);
    this.setState({
      name: '',
      surname: '',
      login: '',
      password: '',
      email: ''
    })
  }

  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  closeWindow = () => {
    this.props.closeRegistrationFailWindow();
  }

  render() {
    const { registrationFail } = this.props;
    return (
      <div className='registration-page'>
        <div className='register'>
          <span> Imię </span> 
          <input className='registration-input' onChange={this.onHandleName} value={this.state.name} />
          <span> Nazwisko </span> 
          <input className='registration-input' onChange={this.onHandleSurname} value={this.state.surname} />
          <span> Login </span> 
          <input className='registration-input' onChange={this.onHandleLogin} value={this.state.login} />
          <span> Hasło </span> 
          <input 
            type='password' 
            className='registration-input' 
            onChange={this.onHandlePassword} 
            value={this.state.password} />
          <span> e-mail </span> 
          <input className='registration-input' onChange={this.onHandleEmail} value={this.state.email} />
          <div className='registration-buttons'>
            <button 
              className='login-button' 
              onClick={() => this.goToAnotherPage('/login')} > 
              Wróć do strony logowania 
            </button> 
            <button className='login-button' onClick={this.onRegister} > Zarejestruj się </button>    
          </div>
      </div>
      { registrationFail && <RegistrationFail closeWindow = {this.closeWindow} />}
    </div>
    )
  }

}

const mapStateToProps = (state) => ({
  registrationFail: state.sessionUser.registrationFail
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  register: (user) => dispatch(register(user)),
  closeRegistrationFailWindow: () => dispatch(closeRegistrationFailWindow())
});


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
