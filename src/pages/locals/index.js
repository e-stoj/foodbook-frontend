import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Local from '../../components/local';
import { getAllLocals, getAllMotives, addNewLocal } from '../../state/locals/index';
import { logout } from '../../state/session-user/index';
import './styles.css';


class LocalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLocalWindow: false,
      showUpdateLocalWindow: false,
      motivesList: [],
      name: '',
      address: '',
      phoneNumber: '',
    }
  }

  componentDidMount() {
    this.props.getAllMotives();
    this.props.getAllLocals();
  }

  goToAnotherPage = (path) => {
    this.props.onPush(path);
  }

  onChange = (event) => {
    const motivesList = this.state.motivesList;
    if(event.target.checked === true) {
      motivesList.push(event.target.value);
    } else {
      const index = motivesList.indexOf(event.target.value)
      if (index !== -1) {
        motivesList.splice(index, 1);
      }
    }
    this.setState({ motivesList: motivesList });
  }

  onHandleLocalName = (event) => {
    this.setState({ name: event.target.value });
  }

  onHandleLocalAddress = (event) => {
    this.setState({ address: event.target.value });
  }

  onHandleLocalPhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  }

  onCloseAddWindow = () => {
    this.setState({ showAddLocalWindow: false });
  }

  onShowAddWindow = () => {
    this.setState({ showAddLocalWindow: true });
  }

  onCloseUpdateWindow = () => {
    this.setState({ showUpdateLocalWindow: false });
  }

  onShowUpdateWindow = () => {
    this.setState({ showUpdateLocalWindow: true });
  }

  onAddLocal = () => {
    const local = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      motives: this.state.motivesList,
    }

    this.props.addNewLocal(local);
    this.onCloseWindow();
  }

  onUpdateLocal = () => {

  }

  onLogout = () => {
    this.props.logout();
    this.goToAnotherPage('/login');
  }
 
  render() {
    const { locals, motives } = this.props;
    const { showAddLocalWindow, showUpdateLocalWindow } = this.state;
    console.log(locals);
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
            {locals.map(local => (
              <div className='local-element' onClick={this.onShowUpdateWindow}>
                <div>{ local.name } </div>
                <div>{ local.address} </div>
                <div>{ local.phoneNumber } </div>
                <div>{ local.motives.map(motive => <span> {motive} </span>)} </div>
              </div>
            ))}
            <div>
              <button className='login-button' onClick={this.onShowAddWindow}>Dodaj lokal</button> 
            </div>
            {showAddLocalWindow && 
            <Local 
              type = 'Dodaj'
              onCloseWindow = {this.onCloseAddWindow}
              onHandleLocalName = {this.onHandleLocalName}
              onHandleLocalAddress = {this.onHandleLocalAddress}
              onHandleLocalPhoneNumber = {this.onHandleLocalPhoneNumber}
              onChange = {this.onChange}
              motives = {motives}
              onAddLocal = {this.onAddLocal}
              localName = {this.state.localName}
              localAddress = {this.state.address}
              localPhoneNumber = {this.state.phoneNumber} />
            }
            {showUpdateLocalWindow && 
            <Local 
              type = 'Zaktualizuj'
              onCloseWindow = {this.onCloseUpdateWindow}
              onHandleLocalName = {this.onHandleLocalName}
              onHandleLocalAddress = {this.onHandleLocalAddress}
              onHandleLocalPhoneNumber = {this.onHandleLocalPhoneNumber}
              onChange = {this.onChange}
              motives = {motives}
              onAddLocal = {this.onUpdateLocal}
              localName = {this.state.localName}
              localAddress = {this.state.address}
              localPhoneNumber = {this.state.phoneNumber} />
            }
          </div>
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  locals: state.locals.localsList,
  motives: state.locals.motivesList
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  getAllLocals: () => dispatch(getAllLocals()),
  getAllMotives: () => dispatch(getAllMotives()),
  addNewLocal: (local) => dispatch(addNewLocal(local)),
  logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(LocalsPage);
