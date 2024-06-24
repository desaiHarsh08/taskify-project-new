import React from 'react'
import { Badge, Form, InputGroup } from 'react-bootstrap'
import Button from '../ui/Button'

const EditTask = ({ task, setMessage, setShowToast, handleChangeTask, handleSave }) => {
    const assigneeOptions = (
        <div className='d-flex gap-2 align-items-center' style={{ fontSize: "12px" }}>
            <img src='' className='p-2 border bg-info rounded' />
            <div>
                <div className='d-flex gap-2 align-items-center'>
                    <p>Harsh Nilesh Desai</p>
                    <Badge>QUOTATION</Badge>
                </div>
                <p>desaiharsh183@gmail.com</p>
            </div>
        </div>
    )

    return (
        <Form className='px-3 pb-4'>
            <div className='mb-3 d-flex'>
                <p className='bg-secondary px-2 py-1 rounded text-light'>Task #1</p>
            </div>
            <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select size="sm" disabled>
                    <option value={task?.taskType}>{task?.taskType}</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select name='taskPriority' size="sm" value={task?.taskPriority} onChange={handleChangeTask}>
                    <option value={"NORMAL"}>NORMAL</option>
                    <option value={"MEDIUM"}>MEDIUM</option>
                    <option value={"HIGH"}>HIGH</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Pump Type</Form.Label>
                <Form.Control type='input' size="sm" value={task?.pumpType} name='pumpType' onChange={handleChangeTask} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Pump Manufacturer</Form.Label>
                <Form.Control type='input' size="sm" value={task?.pumpManufacturer} name='pumpManufacturer' onChange={handleChangeTask} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Specification</Form.Label>
                <Form.Control as="textarea" rows={3} value={task?.specification} name='specification' onChange={handleChangeTask}/>
            </Form.Group>
            
        </Form>
    )
}

export default EditTask