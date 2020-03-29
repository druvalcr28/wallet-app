import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

const PrivateRouteValidID = ({isValidID, isAuthenticated, component:Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => {
            if(isAuthenticated && isValidID){
                return (<Component {...props}/>);
            }
            else if(isAuthenticated && !isValidID){
                return (<Redirect to="/dashboard" />);
            } 
            else{
                return (<Redirect to="/" />);
            }
        }}/>
    );
};
const mapStateToProps = (state,props) => {
    const checkID = props.location.pathname.split('/')[2];
    return {
        isValidID: state.expenses.find((expense) => expense.id === checkID)!=null ? true : false,
        isAuthenticated: state.auth.userID === '' ? false : true
    };
};
export default connect(mapStateToProps)(PrivateRouteValidID);