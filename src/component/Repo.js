import React, {useState} from 'react'
import { Container, Row, Card, Button, Col, Dropdown, DropdownButton } from "react-bootstrap";
import moment from "moment";


export default function Repo(props) {
  

    return (

      <Container>
      <Row>
      <Col lg={12}>
    
    <div className = "top">
    <Container>
    <Row>
    <Col lg= {4}>
     <a href = "#" onClick = {()=> props.setIssues (props.openIssues.items)}>
     <img className = "stateOpen" src = "img/open.svg"/>  
     {props.openIssues && props.openIssues.total_count} opened </a>
     <a href = "#" onClick = {()=> props.setIssues (props.closeIssues.items)}><img className = "stateClose" src = "img/success.svg"/> 
     {props.closeIssues && props.closeIssues.total_count} closed </a>
     </Col>
     <Col lg= {8}>
     <div className = "DropdownGrp">
     <DropdownButton bsPrefix={"default"} id="dropdown-button" title="Author">
     <Dropdown.Item href="#/action-1">Author</Dropdown.Item>
     </DropdownButton>
     <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Labels ">
     <Dropdown.Item href="#/action-1">Labels </Dropdown.Item>
     </DropdownButton>
     <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Projects">
     <Dropdown.Item href="#/action-1">Projects</Dropdown.Item>
     </DropdownButton>
     <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Milestone">
     <Dropdown.Item href="#/action-1">Milestones</Dropdown.Item>
     </DropdownButton>
     <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Assignee">
     <Dropdown.Item href="#/action-1">Assignee</Dropdown.Item>
     </DropdownButton>
     <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Sort">
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
      
        {props.issues && props.issues.map(item => {
          return (
            
            <Col lg={12}>
            <Card>
            <Row className = "cardrow">
            <Col lg= {10}>
                <Card.Body>
                 <Card.Title>
                  <div className = "State"> 
                  {item.state === "open" 
                  ? <img className = "stateOpen" src = "img/open.svg"/> 
                  : <img className = "stateClose" src = "img/success.svg"/>} <br/> 
                  </div>
                  <a href = "#"> {item.title} <br/> </a>
                  </Card.Title>                
                  <Card.Text>
                   <div className ="Update"> 
                   #{item.number} {item.state} {moment (item.updated_at).startOf('day').fromNow()} by 
                   <a href = {item.user.html_url}> {item.user.login} </a>  
                   <br/></div>            
                  </Card.Text>
                  
                  </Card.Body>
              </Col>
               
                
              <Col lg= {2}> 
                  <div className ="User"> 
                    <img className = "avatar" src = {item.user.avatar_url}/> 
                    <a href = {item.user.html_url}> {item.user.login} </a>
                    {item.comments}
                  </div>
              </Col>

              </Row>
            </Card>
           </Col>
          );
        })}
      </Row>
    </Container>
    )
}

