import React from 'react'
import TaskRow from './TaskRow'
import { Table } from 'react-bootstrap'

const TaskList = ({ taskArr }) => {
    return (
        <Table bordered style={{minWidth: "1245px"}}>
            <thead>
                <tr className='text-center'>
                    <th className='bg-body-secondary'>Sr. No.</th>
                    <th className='bg-body-secondary'>Task Id</th>
                    <th className='bg-body-secondary'>Type</th>
                    <th className='bg-body-secondary'>Priority</th>
                    <th className='bg-body-secondary'>Created At</th>
                    <th className='bg-body-secondary'>Status</th>
                    <th className='bg-body-secondary'>Finished</th>
                    <th className='bg-body-secondary'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {taskArr.map((task, index) => (
                    <TaskRow key={`task-${index}`} task={task} index={index} />
                ))}
            </tbody>
        </Table>
    )
}

export default TaskList