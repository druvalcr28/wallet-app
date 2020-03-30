import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import AppRouter,{ history } from './routers/AppRouter';
import * as serviceWorker from './serviceWorker';

// 'Provider' provides the store to all components
import { Provider } from 'react-redux'; 
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login,logout } from './actions/auth';

import {firebase} from './firebase/firebase';

const store = configureStore();

const ar = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

var hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(ar,document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login({userID:user.uid}));
        console.log('logged in');
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } 
    else{
        store.dispatch(logout());
        console.log('logged out');
        renderApp();
        history.push('/');
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
