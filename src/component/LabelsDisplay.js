import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default function LabelsDisplay(props) {
    if(props.labels.length == 0) {
        return <span>&nbsp;</span>
    }
    return props.labels.map ((label) => {
        return (
            <Badge className="labels" style={{
                backgroundColor:`#${label.color}`
                }
            }> 
           {label.name} 
            </Badge>
        )})

}
