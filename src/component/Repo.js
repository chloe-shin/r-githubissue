import React from 'react'
import { Container, Row, Card, Button, Col } from "react-bootstrap";

export default function Repo(props) {
    return (
        <Container>
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
    </Container>
    )
}
