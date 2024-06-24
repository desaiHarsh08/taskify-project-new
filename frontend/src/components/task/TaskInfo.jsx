import React from 'react'
import { Badge } from 'react-bootstrap'
import { TbProgress } from 'react-icons/tb'

const TaskInfo = ({ allUsers, task }) => {
    return (
        <ul className='my-3 mb-5 p-0 d-flex flex-column gap-2' style={{ listStyle: "none" }}>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Type:</p>
                <p className='p-1 px-2 fw-bold'>{task?.taskType}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Assignee:</p>
                <p className='p-1 px-2 bg-body-secondary'>
                    {(allUsers.find(user => user.id === task?.assignedUserId))?.name}
                </p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Status:</p>
                <p className='p-1 px-2'>
                    <Badge bg={`${task?.isCompleted ? 'success' : 'warning text-dark'}`} className='d-flex gap-2'>
                        <TbProgress />
                        <p>{task?.isCompleted ? "CLOSED" : "IN_PROGRESS"}</p>
                    </Badge>
                </p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Created By:</p>
                <p className='p-1 px-2 bg-body-secondary'>
                    {(allUsers.find(user => user.id === task?.createdByUserId)?.name)}
                </p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Pump Type:</p>
                <p className='p-1 px-2'>{task?.pumpType}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Pump Manufacturer:</p>
                <p className='p-1 px-2'>{task?.pumpManufacturer}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Specification:</p>
                <p className='p-1 px-2'>{task?.specification}</p>
            </li>
        </ul>
    )
}

export default TaskInfo