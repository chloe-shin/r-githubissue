import React from 'react'
import {
    Dropdown,
    DropdownButton,  
  } from "react-bootstrap";
export default function DropDownGrp() {
    return (
        <div className = "DropdownGrp">  
        <DropdownButton bsPrefix={"default"} id="dropdown-button" title="Author">
            <Dropdown.Item href="#/action-1">Author</Dropdown.Item>
        </DropdownButton>
      
        <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Labels">
            <Dropdown.Item href="#/action-1">Labels </Dropdown.Item>
        </DropdownButton>
        
        <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Projects">
            <Dropdown.Item href="#/action-1">Projects</Dropdown.Item>
        </DropdownButton>
        
        <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Milestone">
            <Dropdown.Item href="#/action-1"> Milestones </Dropdown.Item>
        </DropdownButton>
        
        <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Assignee">
            <Dropdown.Item href="#/action-1">Assignee</Dropdown.Item>
        </DropdownButton>
        
          <DropdownButton bsPrefix={"default"} id="dropdown-basic-button" title="Sort">
            <Dropdown.Item href="#/action-1">Sort</Dropdown.Item>
          </DropdownButton>`
    </div>
    )
}
