import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

const PublicRoute = ({isAuthenticated, component:Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => {
            return (
            isAuthenticated ? (
                <Redirect to="/dashboard" />
            ) : ( <Component {...props}/>)
            );
        }}/>
    );
};
const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.userID === '' ? false : true
    };
};
export default connect(mapStateToProps)(PublicRoute);
