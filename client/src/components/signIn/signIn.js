import React,{Component} from 'react';
import './signIn.scss';
import {connect} from 'react-redux';
import {loginStart} from '../../redux/user/userActions';
import { Redirect } from 'react-router-dom';

class signIn extends Component {

    constructor(){
        super();
        this.state = {
            email : '',
            password : ''
        };
    }
    
    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userData = {email:this.state.email,password:this.state.password};
        
        this.props.loginStart(userData);
        
    }

    componentDidMount(){
        if(this.props.loggedInButNotVerified){
            this.props.history.push("/");
        }
    }

    redirectFunc = () => {
        return <Redirect to="/"/>;
    }

    render(){
        
        return(
            <div className="signIn">
                 {this.props.loggedInButNotVerified && (this.redirectFunc())}
                <div className="form-wrapper">
                    <form className="signInForm" onSubmit={this.onSubmit}>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange}/>
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                        </div>

                        <div className="buttonDiv">
                        <button type="submit" name="submit">Login</button>
                    </div>
                    </form>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        loggedInButNotVerified : state.user.loggedInButNotVerified
    }
}

function mapDispatchToProps(dispatch){
    return {
        loginStart : (userInfo) =>  dispatch(loginStart(userInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(signIn);