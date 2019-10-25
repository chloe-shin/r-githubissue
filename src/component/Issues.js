import React from 'react'
import {Row, Container, Badge} from 'react-bootstrap'

export default function Issues(props) {
    const currentIssue = props.issues.filter ( ({id}) => id === props.id);
    console.log("filter", currentIssue)
    return (
        <Container>
            <Badge variant="danger">{currentIssue[0] && currentIssue[0].state}</Badge>
            <h1>{currentIssue[0] && currentIssue[0].title}</h1>
            <p>{currentIssue[0] && currentIssue[0].body}</p>
        </Container>
    )
}
