import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';



const SignedInUserProtectedRoute = ({component : Component,isAuth,...rest}) => (

    <Route {...rest} render={props => isAuth ? (<Redirect to="/"/>) : (<Component {...props} />)} />
);

function mapStateToProps(state){
    return {
        isAuth : state.user.isAuth
    }
}

export default connect(mapStateToProps)(SignedInUserProtectedRoute);