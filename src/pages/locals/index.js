import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Local from '../../components/local';
import DeleteLocalFail from '../../components/delete-local-fail';
import { 
  getAllLocals, 
  getAllMotives, 
  addNewLocal, 
  updateLocal, 
  deleteLocal,
  closeDeleteFailWindow } from '../../state/locals/index';
import { logout } from '../../state/session-user/index';
import './styles.css';


class LocalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: {},
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
    const motivesList = this.state.selectedMotives;
    if(event.target.checked === true) {
      motivesList.push(event.target.value);
    } else {
      const index = motivesList.indexOf(event.target.value)
      if (index !== -1) {
        motivesList.splice(index, 1);
      }
    }
    this.setState({ selectedMotives: motivesList });
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
    this.setState({ 
      showAddLocalWindow: true,
      selectedMotives: [],
      name: '',
      address: '',
      phoneNumber: '',
     });
  }

  onCloseUpdateWindow = () => {
    this.setState({ showUpdateLocalWindow: false });
  }

  onShowUpdateWindow = (local) => {
    this.setState({ 
      local: local,
      showUpdateLocalWindow: true,
      selectedMotives: local.motives,
      name: local.name,
      address: local.address,
      phoneNumber: local.phoneNumber,
    });
  }

  onAddLocal = () => {
    const local = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      motives: this.state.selectedMotives,
    }

    this.props.addNewLocal(local);
    this.onCloseAddWindow();
  }

  onUpdateLocal = () => {
    const { local } = this.state;
    const newLocal = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      motives: this.state.selectedMotives,
    }
    this.props.updateLocal(local.localId, newLocal);
    this.onCloseUpdateWindow();
  }

  onDeleteLocal = (local, e) => {
    e.stopPropagation();
    this.props.deleteLocal(local.localId);
  }

  onLogout = () => {
    this.props.logout();
    this.goToAnotherPage('/login');
  }

  onCloseFailWindow = () => {
    this.props.closeDeleteFailWindow();
  }
 
  render() {
    const { locals, motives, deleteFail } = this.props;
    const { showAddLocalWindow, showUpdateLocalWindow, local } = this.state;
    console.log(local);
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
              <div className='local-element' onClick={() => this.onShowUpdateWindow(local)}>
                <FontAwesomeIcon icon = {faTrashAlt} onClick={(e) => this.onDeleteLocal(local, e)} />
                <div>Nazwa lokalu: <span> { local.name } </span> </div>
                <div>Adres: <span> { local.address } </span> </div>
                <div>Numer telefonu: <span> { local.phoneNumber } </span> </div>
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
              name = {this.state.name}
              address = {this.state.address}
              phoneNumber = {this.state.phoneNumber}
              selectedMotives = {this.state.selectedMotives} />
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
              name = {this.state.name}
              address = {this.state.address}
              phoneNumber = {this.state.phoneNumber}
              selectedMotives = {this.state.selectedMotives} />
            }
            {deleteFail && <DeleteLocalFail closeWindow={this.onCloseFailWindow} /> }
          </div>
      </div>
    
    )
  }

}

const mapStateToProps = (state) => ({
  locals: state.locals.localsList,
  motives: state.locals.motivesList,
  deleteFail: state.locals.deleteFail
});

const mapDispatchToProps = (dispatch) => ({
  onPush: (path) => dispatch(push(path)),
  getAllLocals: () => dispatch(getAllLocals()),
  getAllMotives: () => dispatch(getAllMotives()),
  addNewLocal: (local) => dispatch(addNewLocal(local)),
  updateLocal: (id, newLocal) => dispatch(updateLocal(id, newLocal)),
  deleteLocal: (id) => dispatch(deleteLocal(id)),
  closeDeleteFailWindow: () => dispatch(closeDeleteFailWindow()),
  logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(LocalsPage);
