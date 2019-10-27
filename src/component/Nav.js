import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  let { currentOwner, currentRepo } = props;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            src="/img/dog.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
        </Navbar.Brand>
        <Form inline>
          <FormControl
            bsPrefix={"default"}
            type="text"
            placeholder="Search or jump to..."
            className="mr-sm-2 navSearch"
          />
        </Form>
        <Nav className="mr-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to={`/${currentOwner}/${currentRepo}/issues`}>Repo</NavLink>
          <NavLink to="/">Marketplace</NavLink>
          <NavLink to="/">Explore</NavLink>
        </Nav>
      </Navbar>
    </>
  );
}
