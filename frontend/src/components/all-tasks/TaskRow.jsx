import React from 'react'
import Button from '../ui/Button'
import { Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getFormattedDate } from '../../utils/helper'

const TaskRow = ({ task, index }) => {
    const navigate = useNavigate();

    const handleTaskView = (taskId = 1) => {
        navigate(`${taskId}`, { replace: true });
    }

    return (
        <tr>
            <td className='pt-3 text-center'>{index + 1}.</td>
            <td className='pt-3 text-center'>#{task?.id}</td>
            <td className='pt-3 text-center'>{task?.taskType}</td>
            <td className='pt-3 text-center'>
                <p 
                    className='rounded' 
                    style={{
                        backgroundColor: (
                                task?.taskPriority == "NORMAL" ? "#6da8ff" : (
                                    task?.taskPriority == "HIGH" ?  "#ff5757" 
                                        : "grey"
                                )
                            ), 
                        color: "white"
                    }}
                >{task?.taskPriority}</p>
            </td>
            <td className='pt-3 text-center'>{getFormattedDate(task?.createdDate)}</td>
            <td className='pt-3 text-center'>
                <Badge bg={`${task?.isCompleted ? 'success' : 'warning text-dark'}`}>
                    {task?.isCompleted ? "CLOSED" : "IN_PROGRESS"}
                </Badge>
            </td>
            <td className='pt-3 text-center'>-</td>
            <td className='d-flex justify-content-center'>
                <Button size='btn-sm' handleClick={() => handleTaskView(task?.id) }>
                    View
                </Button>
            </td>
        </tr>
    )
}

export default TaskRow