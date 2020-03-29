import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.dispatch(startLogin());
            }}>Login</button>
        </div>
    );
};
export const ConnectedLoginPage = connect()(LoginPage)