import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import logo from './job.jpg';
import profile from './profile.png';
import './header.scss';
import {connect} from 'react-redux';
import {logoutStart} from '../../redux/user/userActions';
import { withRouter } from "react-router-dom";



class Header extends Component {


    logoutStart = () => {
        this.props.logoutStart();
        this.props.history.push("/");
    }

    render(){
        // let photo=null;
        // if(this.props.isAuth){
        //     photo = this.props.currentUser.photo ? this.props.currentUser.photo : 'default';
        // }
        return(
            <nav>
                <ul className="header">
                    <div className="logo">
                        <li><Link to="/"><img src={logo} alt="logo"/></Link></li>
                    </div>
                    
                        {!this.props.isAuth ? 
                        
                            <div className="menu"><li><Link to="/signup">Sign up</Link></li>
                            <li><Link to="/signin">Sign in</Link></li></div> 
                            
                            : 
                            
                            <div className="loginMenu">
                                <div className="loginMenuProfile">
                                <Link to={`/user/${this.props.currentUser._id}`}>
                                    <img src={profile} alt="profile" />
                                    </Link>
                                <Link to={`/user/${this.props.currentUser._id}`}>{this.props.currentUser.name}</Link>
                                </div>
                                {/* <li><Link to="/signout">Signout</Link></li> */}
                                <li><span className="logout" onClick={this.logoutStart}>Logout</span></li>
                            </div>
                            }
                        
                </ul>
            </nav>
            // <div className="header">
            //     <h2><Link to="/">Jop search Portal</Link></h2>
            //     <div className="options">
            //         <Link to="/signup">Sign Up</Link>
            //         <Link to="/signin">Sign In</Link>
            //     </div>
            // </div>
        );
    }
}

function mapStateToProps(state){
    return {
      isAuth : state.user.isAuth,
      currentUser : state.user.currentUser
    }
  }

function mapDispatchToProps(dispatch){
    return{
        logoutStart : () => dispatch(logoutStart())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
