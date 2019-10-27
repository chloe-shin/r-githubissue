import React, { useState, useEffect } from "react";
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
import { Link, useParams, useLocation } from "react-router-dom";
import DropDownGrp from "./DropDownGrp";
import PsudoContainer from "./PsudoContainer";

export default function Repo(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("write");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryText, setQueryText] = useState("");
  const [isClear, setIsClear] = useState(false);
  let { repo, owner } = useParams();

  const [openIssues, setOpenIssues] = useState(0);
  const [closeIssues, setCloseIssues] = useState(0);

  function refreshPage() {
    window.location.reload();
  }

  const headers = {
    "User-Agent": "Mozilla/5.0",
    Authorization: `token ${props.token && props.token.split("&")[0]}`,
    "Content-type": "application/json",
    Accept: "application/vnd.github+json"
  };

  useEffect(() => {
    getOpenIssues(owner, repo);
    getCloseIssues(owner, repo);
  }, [repo, owner]);


  const getOpenIssues = async (user, repo) => {
    const token = sessionStorage.getItem("token");
    const url = `https://api.github.com/search/issues?q=repo:${user}/${repo}+type:issue+state:open&per_page=20`;
    const headers = {
      Accept: "application / vnd.github.v3 + json"
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const openData = await response.json();
    setOpenIssues(openData);
    // console.log(
    //   "open data called by Chloe",
    //   openData,
    //   'open issues"',
    //   openIssues
    // );
  };

  const getCloseIssues = async (user, repo) => {
    const token = sessionStorage.getItem("token");
    const url = `https://api.github.com/search/issues?q=repo:${user}/${repo}+type:issue+state:closed&per_page=20`;
    const headers = {
      Accept: "application / vnd.github.v3 + json"
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const closeData = await response.json();
    setCloseIssues(closeData);
  };

  const postIssues = async () => {
    const url = `https://api.github.com/repos/${props.currentOwner}/${props.currentRepo}/issues`;
    const post = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${props.token}`
      },
      body: JSON.stringify({
        title: queryTitle,
        body: queryText
      })
    });
  };
  const onSubmitIssue = async () => {
    postIssues();
    setIsOpen(false);
  };

  return (
    <Container>
      <p className="directoryIndicator mt-3 mb-1 pl-0"><Link to="/">{owner}</Link>/<Link to={`/${owner}/${repo}/issues`}>{repo}</Link></p>
      <PsudoContainer
        currentOwner={props.currentOwner}
        currentRepo={props.currentRepo}
      />

      <div className="searchIssue_newIssue">
        {props.isError ? (
          ""
        ) : (
            <Form
              inline
              onSubmit={event => {
                event.preventDefault();
                props.searchIssues(event);
              }}
              onChange={event => {
                event.preventDefault();
                props.setQuery(event.target.value);
              }}
            >
              <FormControl
                type="text"
                placeholder=" Search all issues.."
                className=" mr-sm-2"
              />
              <i class="fab fa-searchengin"></i>

              <Button
                className="search-button"
                type="submit"
              // onClick={() => setIsClear(!false)}
              >
                > Submit
            </Button>
            </Form>
          )}

        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          New issue
        </button>
      </div>

      <div>
        {props.isClear && (
          <button onClick={() => refreshPage()} className="clear-search">
            <i class="fas fa-times-circle"></i> Clear current search query,
            filters, and sorts:{" "}
            <u>
              <b>{props.query}</b>
            </u>
          </button>
        )}
      </div>

      {props.isError ? (
        <Card className="error-message-issue">
          <Card.Body>
            <Card.Title className="noResult-title">
              No results matched your search
            </Card.Title>
            <Card.Text>
              You could return to your repo here and try another search
            </Card.Text>
            <Button variant="primary" onClick={() => refreshPage()}>
              Back to previous repository
            </Button>
          </Card.Body>
        </Card>
      ) : (
          <>
            <Row>
              <Col lg={12}>
                <div className="top">
                  <Container>
                    <Row>
                      <Col lg={4} className="totalcount">
                        <a
                          href="#"
                          onClick={() => props.setIssues(openIssues.items)}
                        >
                          <img className="stateOpen" src="/img/open.svg" />
                          {openIssues.total_count} opened{" "}
                        </a>

                        <a
                          href="#"
                          onClick={() => props.setIssues(closeIssues.items)}
                        >
                          <img className="stateClose2" src="/img/success.svg" />
                          {closeIssues.total_count} closed{" "}
                        </a>
                      </Col>
                      <Col lg={8}>
                        {" "}
                        <DropDownGrp />
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
                                    {item.title}
                                    <LabelsDisplay labels={item.labels} />
                                  </a>
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
                                  <a href={item.user.html_url}>
                                    {" "}
                                    {item.user.login}{" "}
                                  </a>
                                </OverlayTrigger>
                                <br />
                              </Card.Text>
                            </Card.Body>
                          </Col>

                          <Col lg={2}>
                            <div className="User">
                              <img
                                className="avatar"
                                src={item.user.avatar_url}
                              />
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
                                <a href={item.user.html_url}>
                                  {" "}
                                  {item.user.login}{" "}
                                </a>
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
          </>
        )}

      <Modal
        className="popupIssues"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="col-md-9 col-sm-12">
          <div className="composer new-comment">
            <span className="comment-avatar">
              <a className="d-inline-block" target="_blank">
                <img
                  className="avatar"
                  src={props.currentUser && props.currentUser.avatar_url}
                  alt="avata"
                />
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
              onClick={event => {
                onSubmitIssue(event);
              }}
            >
              Submit new issue
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
