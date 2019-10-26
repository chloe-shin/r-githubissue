import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function LandingPage(props) {
//   console.log("landing", props.landingData.items && props.landingData.items[0]);
  return (
    <Container fluid="true" className="landing-page">
      <Row>
        <Col className="landing-left-side" lg={6}>
          <h2>Top repo has more than 100000 stars.</h2>
          <Row>
            <Col lg={12}>
              <h3>
                {props.landingData.items &&
                  props.landingData.items[0].full_name}
              </h3>
              <div>
                <p>
                  {props.landingData.items &&
                    props.landingData.items[0].stargazers_count}
                </p>
                <p>
                  {props.landingData.items &&
                    props.landingData.items[0].language}
                </p>
                <p>
                  {props.landingData.items &&
                    props.landingData.items[0].updated_at}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="landing-right-side" lg={6}></Col>
      </Row>
    </Container>
  );
}
