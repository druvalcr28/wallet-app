import React from 'react';
// We use 'Link' or 'NavLink' instead of 'a' tag because, 'Link' provide us client side routing
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const Header = (props) => (
    <div className="header">
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <Link to="/dashboard" className="header__title" style={{ textDecoration:'none' }}><h1>Wallet</h1></Link>
                </Col>
                <Col xs={6} md={8}>
                    <Button className="box-layout__button header__button" onClick={() => {props.dispatch(startLogout());}} varient="flat">Logout</Button>
                </Col>
            </Row>
        </Container>
    </div>
);
export const ConnectedHeader = connect()(Header);