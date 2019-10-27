import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Issues(props) {
  let { issues, comments, setIssueNumber, currentUser } = props;
  let { number } = useParams();
  let issue = issues.find(issue => issue.number === parseInt(number));
  const [commentBox, setComment] = useState("");
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    setIssueNumber(number);
  }, [number]);

  const url = issue && issue.url + "/comments";

  const headers = {
    "User-Agent": "Mozilla/5.0",
    Authorization: `token ${props.token && props.token.split("&")[0]}`,
    "Content-type": "application/json",
    Accept: "application/vnd.github+json"
  };

  const postComment = async commentBox => {
    const body = {
      value: "hahahahaha"
    };
    const post = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        body: commentBox
      })
    });
  };
  const submitIssue = async comment => {
    const result = await postComment(comment);
    props.getComments(number);
    // alert("res", result)
    setComment("");
  };
  if (issue) {
    return (
      <>
        <div className="outterContainer">
          <Row>
            <Col lg={10}>
              <h3>
                {issue.title}{" "}
                <span className="issueNumber h3">#{issue.number}</span>
              </h3>
              {issue.state === "closed" ? (
                <Badge pill variant="danger">
                  <i class="fas fa-check-circle"></i> Closed
                </Badge>
              ) : (
                <Badge pill variant="success">
                  <i class="fas fa-exclamation-circle"></i> Open
                </Badge>
              )}
              <span>
                <strong>{issue.user.login}</strong> opened this issue on{" "}
                {moment(issue.created_at).format("MMM Do YY")} •{" "}
                {issue.comments} comments
              </span>
            </Col>
            <Col></Col>
          </Row>
          <hr />
          <Row className="container-fluid m-0 singleDisscusion">
            <img
              lg={1}
              src={issue.user.avatar_url}
              className="avatarIssue"
              alt={`${issue.user.login}'s avatar`}
            />
            <Col lg={9} className="col discussionBox">
              <div className="discussionHeader">
                <span>
                  <strong>{issue.user.login}</strong> commented{" "}
                  <span>
                    {moment(issue.created_at)
                      .startOf("day")
                      .fromNow()}
                  </span>
                </span>
                <span className="toTheRight emoji">
                  + <i className="far fa-dizzy"></i> •••
                </span>
              </div>
              <div className="discussionBody">
                <ReactMarkdown
                  source={issue.body}
                  escapeHtml={false}
                  id="issueBody"
                ></ReactMarkdown>
              </div>
            </Col>
            <Col className="rightCol">
              <p>
                <strong>Assignees</strong>
              </p>
              {!issue.assignee && <p>No assignee yet</p>}
              <hr />
              <p>
                <strong>Labels</strong>
              </p>
              {!issue.assignee && <p>None yet</p>}
              <hr />
              <p>
                <strong>Projects</strong>
              </p>
              {!issue.assignee && <p>None yet</p>}
              <hr />
              <p>
                <strong>Milestones</strong>
              </p>
              {!issue.assignee && <p>None yet</p>}
              <hr />
            </Col>
          </Row>
          {comments &&
            comments.map(comment => {
              return (
                <>
                  <Row className="timeLine m-0"></Row>
                  <Row
                    className="container-fluid m-0 singleDisscusion"
                    key={comment.id}
                  >
                    <img
                      src={comment.user.avatar_url}
                      className="avatarIssue"
                      alt={`${comment.user.login}'s avatar`}
                    />
                    <Col lg={9} className="discussionBox">
                      <div className="discussionHeader">
                        <span>
                          <strong>{comment.user.login}</strong> commented{" "}
                          <span>{moment(comment.created_at).fromNow()}</span>
                        </span>
                        <span className="toTheRight emoji">
                          {comment.author_association !== "NONE" && (
                            <span className="author">
                              comment.author_associatio{" "}
                            </span>
                          )}
                          {comment.user.login === issue.user.login && (
                            <span className="author">AUTHOR</span>
                          )}
                          + <i className="far fa-dizzy"></i> •••
                        </span>
                      </div>
                      <div className="discussionBody">
                        <ReactMarkdown
                          source={comment.body}
                          escapeHtml={false}
                          id="commentBody"
                        ></ReactMarkdown>
                      </div>
                    </Col>
                    <Col className="rightCol"></Col>
                  </Row>
                </>
              );
            })}
          <Row className="timeLine m-0" height="30px"></Row>
          {issue.state === "closed" && (
            <span className="closeBadge">
              <i class="fas fa-times-circle text-danger"></i>
              <img
                src={issue.user.avatar_url}
                alt="author avatar"
                height="20px"
                className="avatarClosed"
              />
              <strong>{issue.user.login}</strong> closed this{" "}
              {moment(issue.closed_at)
                .startOf("day")
                .fromNow()}
            </span>
          )}
          <Row className="timeLine m-0"></Row>
          <hr className="bottomDivider m-0 p-0" />
          <Row className="m-0">
            {currentUser && (
              <img
                src={currentUser.avatar_url}
                className="avatarIssue mt-3"
                alt={`${currentUser.login}'s avatar`}
              />
            )}
            <Col lg={9} className="newCommentBox">
              <textarea
                placeholder="write comment here"
                className="commentInput"
                value={commentBox}
                onChange={event => setComment(event.target.value)}
              />
              <Button onClick={() => submitIssue(commentBox)}>
                Post comment
              </Button>
            </Col>
          </Row>
        </div>

      </>
    );
  } else return null;
}
