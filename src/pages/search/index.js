import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';
import _ from 'lodash';
import { findFriend, addFriend } from '../../state/user/index';
import { logout } from '../../state/session-user/index';


import './styles.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ''
    }
  }

  onHandleLogin = (event) => {
    this.setState({ login: event.target.value });
  }

  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  onFindFriend = () => {
    const login = this.state.login;
    this.props.findFriend(login);
  }

  onAddFriend = () => {
    const friend = this.props.findedFriend;
    const id = this.props.activeUser.userId;
    this.props.addFriend(id, friend);
  }

  onLogout = () => {
    this.props.logout();
    this.goToAnotherPage('/login');
  }

  render() {
    const { findedFriend } = this.props;
    console.log(findedFriend);
    return (
      <div className='search-page'>
          <div className='header'>
            <span onClick={() => this.goToAnotherPage('/home')} > Strona główna </span>
            <span onClick={() => this.goToAnotherPage('/add-event')} > Stwórz wydarzenie </span>
            <span onClick={() => this.goToAnotherPage('/search')}> Szukaj znajomych </span>
            <span onClick={() => this.goToAnotherPage('/locals')}> Lista lokali </span> 
            <span onClick={this.onLogout}> Wyloguj </span>
          </div>
          <div className='search-friends'>
            <span className='search-span'>Wpisz nazwę użytkownika</span>
            <input className='search-input' onChange={this.onHandleLogin} />
            <button className='search-button' onClick={this.onFindFriend} >Szukaj</button>
            {!_.isEmpty(findedFriend) &&
            <div className='search-friend-result'>
              <span>{ findedFriend.name }</span>
              <span>{ findedFriend.surname }</span>
              <span>{ findedFriend.login }</span>
              <button className='search-button' onClick={this.onAddFriend}> Dodaj znajomego </button>
            </div>
            }
          </div>
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  findedFriend: state.user.friend, 
  activeUser: state.sessionUser.activeUser
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  findFriend: (login) => dispatch(findFriend(login)),
  addFriend: (id, friend) => dispatch(addFriend(id, friend)),
  logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
