import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const EditUser = ({ user, index, handleChangeUser }) => {
    return (
        <Form className='overflow-auto px-3'>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    size="sm" 
                    value={user.name} 
                    name='name'
                    onChange={(e) => handleChangeUser(index, e)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    disabled
                    value={user.email} 
                    name='email'
                    onChange={(e) => handleChangeUser(index, e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select 
                    size="sm" 
                    value={user.department} 
                    name='department'
                    onChange={(e) => handleChangeUser(index, e)}
                >
                    <option value={"QUOTATION"}>QUOTATION</option>
                    <option value={"ACCOUNTS"}>ACCOUNTS</option>
                    <option value={"DISPATCH"}>DISPATCH</option>
                    <option value={"SERVICE"}>SERVICE</option>
                    <option value={"NONE"}>NONE</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                    type='input' 
                    size="sm" 
                    value={user.phone} 
                    name='phone'
                    onChange={(e) => handleChangeUser(index, e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Disabled</Form.Label>
                <Form.Select 
                    size="sm" 
                    value={user.isDisabled} 
                    name='isDisabled'
                    onChange={(e) => handleChangeUser(index, e)}
                >
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                </Form.Select>
            </Form.Group>

        </Form>
    )
}

export default EditUser