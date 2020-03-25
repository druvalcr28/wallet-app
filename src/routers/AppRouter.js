import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ExpenseDashboardPage } from '../components/ExpenseDashboardPage';
import { ConnectedAddExpensePage } from '../components/AddExpensePage';
import { ConnectedEditExpensePage } from '../components/EditExpensePage';
import { NotFoundPage } from '../components/NotFoundPage';
import { Header } from '../components/Header';
 
const AppRouter = () => (
    <BrowserRouter>
        <div>    
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true}/>
                <Route path="/create" component={ConnectedAddExpensePage} />
                <Route path="/edit/:id" component={ConnectedEditExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;