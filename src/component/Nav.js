
import React from 'react';
import {Navbar,Nav, Form, FormControl, Button} from 'react-bootstrap';

export default function Navigation() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <img
                src="img/dog.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              /> {' '}
   
                </Navbar.Brand>
                <Form inline>
                    <FormControl  bsPrefix={"default"} type="text" placeholder="Search or jump to..." className="mr-sm-2 navSearch" />
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
