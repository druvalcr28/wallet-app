import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedHeader } from '../components/Header';

export const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route {...rest} component={(props) => {    // its the props which are passed to the specified component
        return (
        isAuthenticated ? (
            <div>
                <ConnectedHeader />
                <Component {...props}/>
            </div>
        ) : (<Redirect to="/"/>)
        );
    }}/>
);
const mapStateToProps = (state,props) => {
    return {
        isAuthenticated: state.auth.userID === '' ? false : true
    };
};
export default connect(mapStateToProps)(PrivateRoute);