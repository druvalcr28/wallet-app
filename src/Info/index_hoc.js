import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Details : {props.details}</p>
    </div>
);

const requireAuth = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin ? (<WrappedComponent {...props}/>) : (<p>Please Login</p>) }
        </div>
    );    
};
const AuthInfo = requireAuth(Info);

ReactDOM.render(<AuthInfo isAdmin={true} details='These are the details'/>, document.getElementById('root'));