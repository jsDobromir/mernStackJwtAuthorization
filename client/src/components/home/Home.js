import React,{Component} from 'react';
import './home.scss';
import {connect} from 'react-redux';
import {verifyTokenStart} from '../../redux/user/userActions';

class Home extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token');
    if(token){
      this.props.verifyTokenStart(token);
    }
  }

  render(){
    
    return (
        //check if authenticated ,if not display signup/login menu
        <div className="home">
          <h1>Home Component</h1>
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);