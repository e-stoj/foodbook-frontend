import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import RegistrationPage from './pages/registration';
import SearchPage from './pages/search';
import AddEventPage from './pages/add-event';
import EventPage from './pages/event';
import LocalsPage from './pages/locals';
import './App.css';

class App extends Component {
  render() {
    const { online } = this.props;
    return (
      <div className="App">
        {/* {!online && (<Redirect to='/login' />)} */}
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/home' component={HomePage} />
          <Route path='/registration' component={RegistrationPage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/add-event' component={AddEventPage} />
          <Route path='/event' component={EventPage} />
          <Route path='/locals' component={LocalsPage} />
        </Switch> 
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  online: state.sessionUser.online
});

export default withRouter(connect(mapStateToProps)(App));
