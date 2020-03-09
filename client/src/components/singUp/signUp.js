import React,{Component} from 'react';
import './signUp.scss';
import {connect} from 'react-redux';
import {setAlert} from '../../redux/alerts/alertActions';
import * as api from '../../utils/api';

class signUp extends Component {
  
  
   
  constructor(){
    super();
    this.state = {
        name : '',
        email : '',
        password : '',
        confirmPassword : ''
    };
  }


  onSubmit = async (event) => {
      event.preventDefault();
      const userObj = {name : this.state.name,email : this.state.email,password : this.state.password,confirmPassword : this.state.confirmPassword};
      try{
        const {data} = await api.signUp(userObj);
        this.props.setAlert(data.message,'success');
        this.setState({name : '',email : '',password : '',confirmPassword : ''});
        this.timer = setTimeout(()=>{this.props.history.push("/")},6000)
      }catch(error){
        this.props.setAlert(error.response.data.message,'danger');
        this.setState({name : '',email : '',password : '',confirmPassword : ''});
      }
  }

  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  onInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }


  render(){
    return (
      <div className="signUpContainer">
        <h2>Sign up and start looking for work today</h2>
        <div className="signUp">
            
            <form className="signUpForm" onSubmit={this.onSubmit}>
                    <div className="formGroup">
                      <label htmlFor="username">Name</label>
                      <input type="text" name="name" value={this.state.name} onChange={this.onInputChange}/>
                    </div>

                    <div className="formGroup">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" value={this.state.email} onChange={this.onInputChange}/>
                    </div>

                    <div className="formGroup">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" value={this.state.password} onChange={this.onInputChange}/>
                    </div>

                    <div className="formGroup">
                      <label htmlFor="passwordConfirm">Confirm Password</label>
                      <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onInputChange}/>
                    </div>
                    <div className="buttonDiv">
                      <button type="submit" name="submit">Register</button>
                  </div>
            </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){

    return state;
}

function mapPropsToState(dispatch){
    return{
        setAlert : (msg,alertType) => {dispatch(setAlert(msg,alertType))}
    }
}

export default connect(mapStateToProps,mapPropsToState)(signUp);