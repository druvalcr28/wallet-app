import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const LoginPage = (props) => {
    return (
        <div className="box-layout">
            <Card className="box-layout__card" style={{ width: '18rem' }}>
                <Card.Header><h3 className="box-layout__title">Wallet App</h3></Card.Header>
                <Card.Body>
                    <Card.Title><h5 className="box-layout__subtitle">Sign-In with Google account</h5></Card.Title>
                    
                    <div align="center">
                    <Button className="box-layout__button" onClick={() => {props.dispatch(startLogin());}} variant="flat">Login</Button>
                    </div>
                    
                </Card.Body>
            </Card>
        </div>
    );
};
export const ConnectedLoginPage = connect()(LoginPage)