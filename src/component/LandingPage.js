import React, {useState} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import PaginationPack from "./Pagination";

export default function LandingPage(props) {
  const [query, setQuery] = useState("")
  // console.log("landing", props.landingData.items && props.landingData.items);

  return (
    <Container fluid="true" className="landing-page">
      <Row>
        <Col className="landing-right-side" lg={12}>
          <h3>Find your destination</h3>
          <input 
          onChange={event => setQuery(event.target.value)}
          placeholder="Enter your curious"></input>
          <Button className="landing-button" onClick={() => props.searchRepo(query, props.token)}>Find</Button>
        </Col>
        <Col className="landing-left-side" lg={12}>
          <h2>Top repo has more than 100000 stars.</h2>
          <Row>
            {props.landingData.items &&
              props.landingData.items.map(item => {
                return (
                  <Col lg={6}>
                    <div className="item-repo">
                      <h3>{item && item.full_name}</h3>
                      <div className="top-repo-display">
                        <p>
                          {item && item.stargazers_count}{" "}
                          <i className="far fa-star"></i>
                        </p>
                        <p>{item && item.language}</p>
                        <p>
                          Created {item && moment(item.created_at).fromNow()}
                        </p>
                        <p>
                          Updated on {item && moment(item.updated_at).fromNow()}
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Col>
        <PaginationPack/>
      </Row>
    </Container>
  );
}
