import React, { useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";
import { Tab, Tabs } from "react-bootstrap";
export default function Repo(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("write");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryText, setQueryText] = useState("");

  const onSubmitIssue = () => {
    setIsOpen(false);
    console.log(queryText);
  };
  return (
    <Container>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>New issue</button>
      <Row>
        {props.issues.map(item => {
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
      <Modal
        className="popupIssues"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="col-md-9 col-sm-12">
          <div className="composer new-comment">
            <span className="comment-avatar">
              <a className="d-inline-block">
                <img className="avatar" src="#" alt="avata" />
              </a>
            </span>
            <div className="comment">
              <div className="topic-header">
                <input
                  className="input-title"
                  autoFocus="autofocus"
                  placeholder="Title"
                  type="text"
                  onChange={title => setQueryTitle(title.target.value)}
                />
              </div>
              <div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={k => setKey(k)}
                >
                  <Tab eventKey="write" title="Write">
                    <tab-container className="comment-form">
                      <div className="write-content">
                        <text-expander>
                          <textarea
                            value={queryText}
                            placeholder="Leave comment"
                            className="text-area"
                            style={{ width: "100%", height: "434px" }}
                            onChange={text => setQueryText(text.target.value)}
                          >
                            {queryText.toString()}
                          </textarea>
                        </text-expander>
                      </div>
                    </tab-container>
                  </Tab>
                  <Tab eventKey="review" title="Review">
                    <tab-container className="comment-form">
                      <div className="write-content">
                        <text-expander>
                          <ReactMarkdown
                            source={queryText}
                            className="markdownReview"
                          />
                        </text-expander>
                      </div>
                    </tab-container>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="button">
            <button
              disabled={!queryTitle}
              className="btn btn-primary"
              onClick={() => onSubmitIssue()}
            >
              Submit new issue
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
