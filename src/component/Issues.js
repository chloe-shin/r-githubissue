import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { Row, Col, Button } from "react-bootstrap";

export default function Issues(props) {
  let { issue, comments } = props;
  const [dataComment, setDataComment] = useState("");
  // console.log("within Issue.js:", issue, "and the comment is: ", comments);
  console.log("issue", props.token);
  const url = `https://api.github.com/repos/nakasaky55/fake-imdb/issues/1/comments`;
  const headers = {
    "User-Agent": "Mozilla/5.0",
    Authorization: `token ${props.token && props.token.split("&")[0]}`,
    "Content-type": "application/json",
    Accept: "application/vnd.github+json"
  };
  const postComment = async comment => {
    const body = {
      value: "hahahahaha"
    };
    const post = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        body: comment
      })
    });
  };
  return (
    issue && (
      <>
        <div className="outterContainer">
          <h3>{issue.title}</h3>
          <hr />
          <Row className="container-fluid m-0 singleDisscusion mb-5">
            <img
              src={issue.user.avatar_url}
              className="avatarIssue"
              alt={`${issue.user.login}'s avatar`}
            />
            <Col className="col discussionBox">
              <div className="discussionHeader">
                <span>
                  <strong>{issue.user.login}</strong> commented{" "}
                  <span>{moment(issue.created_at).fromNow()}</span>
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
            <Col className="col rightCol">
              <p>
                <strong>Assignees</strong>
              </p>
              <hr />
            </Col>
          </Row>
          {comments.map(comment => {
            return (
              <Row
                className="container-fluid m-0 singleDisscusion mb-5"
                key={comment.id}
              >
                <img
                  src={comment.user.avatar_url}
                  className="avatarIssue"
                  alt={`${comment.user.login}'s avatar`}
                />
                <Col className="col discussionBox">
                  <div className="discussionHeader">
                    <span>
                      <strong>{comment.user.login}</strong> commented{" "}
                      <span>{moment(comment.created_at).fromNow()}</span>
                    </span>
                    <span className="toTheRight emoji">
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
                <Col className="col rightCol"></Col>
              </Row>
            );
          })}
          <Row>
            <Col lg={6} className="comment-section">
              <img
                src={issue.user.avatar_url}
                className="avatarIssue"
                alt={`${issue.user.login}'s avatar`}
              />
              <textarea
                onChange={e => setDataComment(e.target.value)}
              ></textarea>
              <Button onClick={() => postComment(dataComment)}>Post </Button>
            </Col>
          </Row>
        </div>
        {/* rendering all the comments section */}
      </>
    )
  );
}
