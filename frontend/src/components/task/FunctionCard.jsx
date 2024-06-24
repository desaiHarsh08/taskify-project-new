import React from 'react'
import { Card } from 'react-bootstrap'
import { getFormattedDate } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

const FunctionCard = ({ func }) => {
    const navigate = useNavigate();

    const handleFunctionClick = (functionId) => {
        navigate(`${functionId}`, { replace: true });
    } 

    return (
        <Card 
            onClick={() => handleFunctionClick(func?.id)}
            style={{ cursor: "pointer", margin: "12px 0" }}
        >
            <Card.Header style={{ 
                backgroundColor: func?.isCompleted ? "rgb(182, 227, 182)" : "#f8f8f8" 
            }}>
                {func?.functionDepartment}
            </Card.Header>
            <Card.Body>
                <Card.Text>{getFormattedDate(func?.addedDate)}</Card.Text>
                <Card.Title>{func?.functionTitle}</Card.Title>
                <Card.Text>{func?.functionDescription}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FunctionCard