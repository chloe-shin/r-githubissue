import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import PaginationPack from "./Pagination";

export default function LandingPage(props) {
  const [query, setQuery] = useState("");
  console.log("prprpr", props.search);

  // console.log("landing", props.landingData.items && props.landingData.items);

  return (
    <Container fluid="true" className="landing-page">
      <Row>
        <Col className="landing-right-side mt-5" lg={12}>
          <form
            onSubmit={event => {
              event.preventDefault();
              props.searchRepo(query, props.token);
            }}
          >
          <img
          src="/img/dog.svg"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        /> <br/>
            <h3 className= "landingtitle">
            BUILD BETTER. FASTER. TOGETHER.</h3>
            <p className= "landingtitle2"> Now you can do with 
            
            CHUON CHUON HUB <img
            src="/img/dog.svg"
            width="22"
            height="22"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />   </p> <br/>
          <div className = "searchGrp">  
            <input
              onChange={event => setQuery(event.target.value)}
              placeholder="What are you looking for?"
            ></input>
            <Button
              type="submit"
              className="landing-button"
              onClick={() => props.searchRepo(query, props.token)}
            >
              FIND
            </Button>
            </div>
          </form>
        </Col>
        <Col className="landing-left-side" lg={12}>
          <h5 className = "top10"> MEET TOP 10 REPOSITORIES FOR YOU </h5> 
          <img
          src="/img/arrow.svg"
          width="30"
          height="30"
          className="d-inline-block align-top arrow"
          alt="React Bootstrap logo"
        /> <br/>
          <Row>
            {props.landingData.items &&
              props.landingData.items.map(item => {
                console.log("item", item);
                return (
                  <Col lg={6}>
                    <div className="item-repo">
                      <Link to={`/${item.full_name}/issues`}>
                        <span
                          className="span-custom"
                          onClick={() => {
                            props.getRepoIssues(item.full_name, props.token);
                            props.setCurrentOwner(item.full_name.split("/")[0]);
                            props.setCurrentRepo(item.full_name.split("/")[1]);
                          }}
                        >
                          {item && item.full_name}
                        </span>
                      </Link>
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
        {/* <PaginationPack/> */}
      </Row>
    </Container>
  );
}
