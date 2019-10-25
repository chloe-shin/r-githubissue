import React from 'react'
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

export default function Issues(props) {
    let { issue, comments } = props;
    console.log('within Issue.js:', issue, 'and the comment is: ', comments)
    return issue && (
        <>
            <div className='outterContainer'>
                <h3>{issue.title}</h3>
                <hr />
                <Row className='container-fluid m-0 singleDisscusion mb-5'>
                    <img src={issue.user.avatar_url} className='avatarIssue' alt={`${issue.user.login}'s avatar`} />
                    <Col className='col discussionBox'>
                        <div className='discussionHeader'>
                            <span><strong>{issue.user.login}</strong> commented <span>{moment(issue.created_at).fromNow()}</span></span>
                            <span className='toTheRight emoji'>+ <i className="far fa-dizzy"></i> •••</span>
                        </div>
                        <div className='discussionBody'>
                            <ReactMarkdown
                                source={issue.body}
                                escapeHtml={false}
                                id='issueBody'
                            ></ReactMarkdown>
                        </div>
                    </Col>
                    <Col className='col rightCol'>
                        <p><strong>Assignees</strong></p>
                        <hr />
                    </Col>
                </Row>
                {comments.map(comment => {
                    return (
                        <Row className='container-fluid m-0 singleDisscusion mb-5' key={comment.id}>
                            <img src={comment.user.avatar_url} className='avatarIssue' alt={`${comment.user.login}'s avatar`} />
                            <Col className='col discussionBox'>
                                <div className='discussionHeader'>
                                    <span><strong>{comment.user.login}</strong> commented <span>{moment(comment.created_at).fromNow()}</span></span>
                                    <span className='toTheRight emoji'>+ <i className="far fa-dizzy"></i> •••</span>
                                </div>
                                <div className='discussionBody'>
                                    <ReactMarkdown
                                        source={comment.body}
                                        escapeHtml={false}
                                        id='commentBody'
                                    ></ReactMarkdown>
                                </div>
                            </Col>
                            <Col className='col rightCol'>
                                
                            </Col>
                        </Row>
                    )
                })}
            </div>
            {/* rendering all the comments section */}

        </>
    )
}
