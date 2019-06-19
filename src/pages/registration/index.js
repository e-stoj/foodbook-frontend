import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../state/session-user';
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
    console.log(user);
    this.props.register(user);
  }

  render() {
    return (
      <div className='registration-page'>
          <div className='register'>
            <span> Imię </span> 
            <input className='registration-input' onChange={this.onHandleName} />
            <span> Nazwisko </span> 
            <input className='registration-input' onChange={this.onHandleSurname} />
            <span> Login </span> 
            <input className='registration-input' onChange={this.onHandleLogin} />
            <span> Hasło </span> 
            <input type='password' className='registration-input' onChange={this.onHandlePassword} />
            <span> e-mail </span> 
            <input className='registration-input' onChange={this.onHandleEmail} />
            <button className='login-button' onClick={this.onRegister} > Zarejestruj się </button>    
      </div>
    </div>
    )
  }

}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  register
};


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
