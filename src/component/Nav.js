
import React from 'react';
import {Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap';

export default function Navigation() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">The GubHit</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search or jump to..." className="mr-sm-2" />
                </Form>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Pull Request</Nav.Link>
                    <Nav.Link href="#features">Issues</Nav.Link>
                    <Nav.Link href="#pricing">Marketplace</Nav.Link>
                    <Nav.Link href="#pricing">Explore</Nav.Link>
                </Nav>
                
            </Navbar>
        </>
    )
}
