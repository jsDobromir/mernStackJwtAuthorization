import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';



const AuthRoute = ({component : Component,isAuth,...rest}) => (

    <Route {...rest} render={props => isAuth ? (<Component {...props} />) : (<Redirect to="/"/>)} />
);

function mapStateToProps(state){
    return {
        isAuth : state.user.isAuth
    }
}

export default connect(mapStateToProps)(AuthRoute);