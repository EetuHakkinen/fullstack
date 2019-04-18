import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateBlog from './CreateBlog';
import { Link } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import { Button, Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {
    var name = '';
    if (props.user && props.user.name) {
        name = props.user.name
    }
    return (
        <div>
            <Navigation user={name} setUser={props.setUser} />
            <h1>Blogs</h1>
        </div>
    );
}

const Navigation = ({ user, setUser }) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link href="#" as="span">
                    <Link to="/">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <Link to="/users">users</Link>
                </Nav.Link>
                <Nav.Item as="span">
                    {user} logged in
                </Nav.Item>
                <Nav.Item>
                    <Button variant="outline-secondary" onClick={() => setUser(null)}>logout</Button>
                </Nav.Item>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        notification: state.notification
    }
}

export default connect(mapStateToProps, { setUser })(Header);