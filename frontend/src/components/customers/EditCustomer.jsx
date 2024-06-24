import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'

const EditCustomer = ({ index, customer, handleChangeCustomer }) => {
    useEffect(() => {}, [customer])

    return (
        <Form className='px-3 overflow-auto ' style={{height: "320px"}}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    size="sm" 
                    value={customer?.customerName} 
                    name='customerName'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    value={customer?.email} 
                    name='email'
                    onChange={(e) => handleChangeCustomer(e)}
                    disabled

                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Person Of Contact</Form.Label>
                <Form.Control 
                    value={customer?.personOfContact} 
                    type='input' 
                    size="sm" 
                    name='personOfContact'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                    value={customer?.phone} 
                    type='input' 
                    size="sm" 
                    name='phone'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    value={customer?.address} 
                    as="textarea" 
                    rows={3}  
                    size="sm" 
                    name='address'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                    value={customer?.city} 
                    type='input' 
                    size="sm" 
                    name='city'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>
            <Form.Group className="mb-5">
                <Form.Label>Pincode</Form.Label>
                <Form.Control 
                    value={customer?.pincode} 
                    type='input' 
                    size="sm" 
                    name='pincode'
                    onChange={(e) => handleChangeCustomer(e)}
                />
            </Form.Group>

        </Form>
    )
}

export default EditCustomer