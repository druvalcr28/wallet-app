import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { NavLink } from 'react-router-dom';

export const Header = () => (
    <div>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/" activeClassName="is-active" exact={true}><p>DashBoard</p></NavLink>
            <NavLink to="/create" activeClassName="is-active"><p>Create Expense</p></NavLink>
        </div>
    </div>
);