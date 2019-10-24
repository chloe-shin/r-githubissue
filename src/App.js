import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import "./App.css";
import { get } from "http";

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);
function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);

  const getAPI = async () => {
    
    const url = `https://api.github.com/repos/facebook/react/issues?per_page=20`;
    const response = await fetch(url);

    const jsonData = await response.json();

    console.table(jsonData);
    setIssues(jsonData);
  };
  // console.log(issues);
  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
      getAPI();
    }
  }, []);

  return (
    <Container>
      <Row>
        {issues.map(item => {
          return (
            <Col lg={12}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
