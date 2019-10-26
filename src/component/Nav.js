
import React from 'react';
import {Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

export default function Navigation(props) {
    let {currentOwner, currentRepo} = props
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">The GubHit</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search or jump to..." className="mr-sm-2" />
                </Form>
                <Nav className="mr-auto">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to={`/${currentOwner}/${currentRepo}/issues`}>Repo</NavLink>
                    <NavLink to="/">Marketplace</NavLink>
                    <NavLink to="/">Explore</NavLink>
                </Nav>
                
            </Navbar>
        </>
    )
}
