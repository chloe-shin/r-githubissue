import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  let { currentOwner, currentRepo } = props;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="/img/dog.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /> CC HUB
        </Navbar.Brand>
        <Form inline>
          <FormControl
            bsPrefix={"default"}
            type="text"
            placeholder="Search or jump to..."
            className="mr-sm-2 navSearch"
          />
        </Form>
        <Nav className="mr-auto navmenu">
          <NavLink className = "nav" to="/">Home</NavLink>
          <NavLink className = "nav" to={`/${currentOwner}/${currentRepo}/issues`}>Repo</NavLink>
          <NavLink className = "nav" to="/">Marketplace</NavLink>
          <NavLink className = "nav" to="/">Explore</NavLink>
        </Nav>
      </Navbar>
    </>
  );
}
