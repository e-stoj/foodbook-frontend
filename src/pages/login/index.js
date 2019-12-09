import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginFail from '../../components/login-fail';
import { logIn, closeLoginFailWindow } from '../../state/session-user';
import './styles.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  onHandleUserName = (event) => {
    this.setState({ username: event.target.value });
  }

  onHandlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onLogin = () => {
    const user = this.state;
    this.props.logIn(user);
    this.setState({
      username: '',
      password: ''
    });
  } 

  closeWindow = () => {
    this.props.closeLoginFailWindow();
  }

  render() {
    const { invalidLogin } = this.props;
    console.log(invalidLogin);
    return (
      <div className='login-page'>
        <div className='login'>
          <span> Login </span> 
          <input className='login-input' onChange={this.onHandleUserName} value={this.state.username} />
          <span> Hasło </span> 
          <input type='password' className='login-input' onChange={this.onHandlePassword} value={this.state.password} />
          <button className='login-button' onClick={this.onLogin} > Zaloguj </button>
          <div className='line'>
            <div className='line-element' /> 
            Nie masz jeszcze konta?
            <div className='line-element' /> 
          </div>
          <div>
            <button className='login-button' onClick={() => this.goToAnotherPage('/registration')}> 
              Zarejestruj się 
            </button>
          </div>
          {invalidLogin && <LoginFail closeWindow = {this.closeWindow} />}
      </div>
    </div>
    )
  }

}

const mapStateToProps = (state) => ({
  online: state.sessionUser.online,
  activeUser: state.sessionUser.activeUser,
  invalidLogin: state.sessionUser.invalidLogin
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (user) => dispatch(logIn(user)),
  onPush: (path) => dispatch(push(path)),
  closeLoginFailWindow: () => dispatch(closeLoginFailWindow())
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
