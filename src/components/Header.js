import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = (props) => (
    <div>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/dashboard" activeClassName="is-active" exact={true}><p>DashBoard</p></NavLink>
            <NavLink to="/create" activeClassName="is-active"><p>Create Expense</p></NavLink>
            <button onClick={() => {
                props.dispatch(startLogout());
            }}>Logout</button>
        </div>
    </div>
);
export const ConnectedHeader = connect()(Header);