import React from 'react';
import Container from "react-bootstrap/Container";

export default function PsudoContainer(props) {
    const guideline = `https://github.com/${props.currentOwner}/${props.currentRepo}/blob/master/CONTRIBUTING.md`
    const contribute = `https://github.com/${props.currentOwner}/github/contribute`
    
    return (

        <Container Fluid className="psudo">         
        <p className= "contribute">👋 Want to contribute to {props.currentOwner}/{props.currentRepo}?</p> 
        If you have a bug or an idea, read the  <a className = "psudolink" href = {guideline}> 
        contributing guidelines </a> before opening an issue. <br/>
        If you're ready to tackle some open issues,  <a className = "psudolink" href = {contribute}>we've collected some good first issues for you.</a> 
        </Container>
    )
}
