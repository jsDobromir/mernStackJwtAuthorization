import React,{Component} from 'react';
import { Switch,Route} from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import Home from './components/home/Home';
import signUp from './components/singUp/signUp';
import Header from './components/header/Header';
import Alert from './components/alert/Alert';
import ActivateAccount from './components/activateAccount/ActivateAccount';
import signIn from './components/signIn/signIn';
import AuthRoute from './utils/routesUtils/AuthRoute';
import UserComponent from './components/userComponent/UserComponent';
import SignedInUserProtectedRoute from './utils/routesUtils/SignedInUserProtectedRoute';
import {verifyTokenStart} from './redux/user/userActions';

class App extends Component {

  componentDidMount(){
    console.log('appjs componentDidMount');
    const token = localStorage.getItem('token');
    if(token){
      this.props.verifyTokenStart(token);
    }
  }


  render(){
    return (
      <div className="App">
        <Header/>
        <Alert/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <SignedInUserProtectedRoute path="/signup" component={signUp} />
          <SignedInUserProtectedRoute path="/signin" component={signIn} />
          <AuthRoute path="/user/:id" component={UserComponent} />
          <Route path="/auth/activate/:token" component={ActivateAccount} />
        </Switch>
      </div>
      
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser : state.user.currentUser
  }
}
function mapDispatchToProps(dispatch){
  return {
    verifyTokenStart : (token) => {dispatch(verifyTokenStart(token))}
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
