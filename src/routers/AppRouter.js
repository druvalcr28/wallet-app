import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { Router, Route, Switch } from 'react-router-dom';
import { ConnectedLoginPage } from '../components/LoginPage';
import { ExpenseDashboardPage } from '../components/ExpenseDashboardPage';
import { ConnectedAddExpensePage } from '../components/AddExpensePage';
import { ConnectedEditExpensePage } from '../components/EditExpensePage';
import { NotFoundPage } from '../components/NotFoundPage';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PrivateRouteValidID from './PrivateRouteValidID';

export const history = createBrowserHistory();
 
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={ConnectedLoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={ConnectedAddExpensePage} />
                <PrivateRouteValidID path="/edit/:id" component={ConnectedEditExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;