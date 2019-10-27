import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactMarkdown from "react-markdown";
import { Tab, Tabs } from "react-bootstrap";
import moment from "moment";
import LabelsDisplay from "./LabelsDisplay";
import { Link } from "react-router-dom";

export default function Repo(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("write");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryText, setQueryText] = useState("");
  const [isClear, setIsClear] = useState(false);

  const headers = {
    "User-Agent": "Mozilla/5.0",
    Authorization: `token ${props.token && props.token.split("&")[0]}`,
    "Content-type": "application/json",
    Accept: "application/vnd.github+json"
  };
  console.log("repo props", props);
  const postIssues = async () =>{
    const url = `https://api.github.com/repos/${props.currentOwner}/${props.currentRepo}/issues`;
    const post = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        title: queryTitle,
        body: queryText,
      })
    })
  }
  const onSubmitIssue = async() => {
    postIssues();
    setIsOpen(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3"> </Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );
  return (
    <Container>
      <div className="searchIssue_newIssue">
        <Form
          inline
          onSubmit={event => props.searchIssues(event)}
          onChange={event => props.setQuery(event.target.value)}
        >
          <FormControl
            type="text"
            placeholder="Search all issues.."
            className=" mr-sm-2"
          />
          <Button
            className="search-button"
            type="submit"
            onClick={() => setIsClear(!false)}
          >
            Submit
          </Button>
          {isClear && (
            <button onClick={() => props.getAPI()} className="clear-search">
              Clear current search query, filters, and sorts
            </button>
          )}
        </Form>
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          New issue
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <div className="top">
            <Container>
              <Row>
                <Col lg={4} className="totalcount">
                  <a
                    href="#"
                    onClick={() => props.setIssues(props.openIssues.items)}
                  >
                    <img className="stateOpen" src="/img/open.svg" />
                    {props.openIssues &&
                      props.openIssues.total_count} opened{" "}
                  </a>

                  <a
                    href="#"
                    onClick={() => props.setIssues(props.closeIssues.items)}
                  >
                    <img className="stateClose2" src="/img/success.svg" />
                    {props.closeIssues &&
                      props.closeIssues.total_count} closed{" "}
                  </a>
                </Col>
                <Col lg={8}>
                  <div className="DropdownGrp">
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-button"
                      title="Author"
                    >
                      <Dropdown.Item href="#/action-1">Author</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-basic-button"
                      title="Labels "
                    >
                      <Dropdown.Item href="#/action-1">Labels </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-basic-button"
                      title="Projects"
                    >
                      <Dropdown.Item href="#/action-1">Projects</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-basic-button"
                      title="Milestone"
                    >
                      <Dropdown.Item href="#/action-1">
                        Milestones
                      </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-basic-button"
                      title="Assignee"
                    >
                      <Dropdown.Item href="#/action-1">Assignee</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      bsPrefix={"default"}
                      id="dropdown-basic-button"
                      title="Sort"
                    >
                      <Dropdown.Item href="#/action-1">Sort</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>

      <Row>
        {props.issues &&
          props.issues.map(item => {
            console.log("issue, listen to charles", item);
            return (
              <Col key={`issue#${item.number}`} lg={12}>
                <Card>
                  <Row className="cardrow">
                    <Col lg={10}>
                      <Card.Body>
                        <Link
                          to={`/${props.currentOwner}/${props.currentRepo}/issues/${item.number}`}
                        >
                          <Card.Title>
                            <div className="State">
                              {item.state === "open" ? (
                                <img
                                  className="stateOpen"
                                  src="/img/open.svg"
                                />
                              ) : (
                                <img
                                  className="stateClose"
                                  src="/img/success.svg"
                                />
                              )}{" "}
                              <br />
                            </div>
                            <a href="#">
                              {" "}
                              {item.title} <br />{" "}
                            </a>{" "}
                            <br />
                            <LabelsDisplay labels={item.labels} />
                          </Card.Title>
                        </Link>
                        <Card.Text>
                          #{item.number} {item.state}{" "}
                          {moment(item.updated_at)
                            .startOf("day")
                            .fromNow()}{" "}
                          by
                          <OverlayTrigger
                            trigger="hover"
                            placement="right"
                            overlay={
                              <Popover id="popover-basic">
                                <Popover.Title as="h3">
                                  <img
                                    className="popOverimg"
                                    src={item.user.avatar_url}
                                  />
                                  <strong>{item.user.login}</strong>
                                </Popover.Title>
                                <Popover.Content></Popover.Content>
                              </Popover>
                            }
                          >
                            <a href={item.user.html_url}> {item.user.login} </a>
                          </OverlayTrigger>
                          <br />
                        </Card.Text>
                      </Card.Body>
                    </Col>

                    <Col lg={2}>
                      <div className="User">
                        <img className="avatar" src={item.user.avatar_url} />
                        <OverlayTrigger
                          trigger="hover"
                          placement="left"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Title as="h3">
                                <img
                                  className="popOverimg"
                                  src={item.user.avatar_url}
                                />
                                <strong>{item.user.login}</strong>
                              </Popover.Title>
                              <Popover.Content>
                                {item.user.site_admin}
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <a href={item.user.html_url}> {item.user.login} </a>
                        </OverlayTrigger>

                        <div className="comment-chloe">
                          <i class="fas fa-comment"></i>
                          {item.comments}
                        </div>
                      </div>
                    </Col>
                  </Row>
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
              <a
                className="d-inline-block"
                target="_blank"
              >
                <img className="avatar" src={props.currentUser && props.currentUser.avatar_url} alt="avata" />
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
              onClick={()=>onSubmitIssue()}
            >
              Submit new issue
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
