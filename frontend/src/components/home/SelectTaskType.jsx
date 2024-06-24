import React from 'react'
import { Form } from 'react-bootstrap'

const SelectTaskType = ({ selectedTaskType, setSelectedTaskType }) => {
    return (
        <div 
            className="modal fade" 
            id="inputTaskTypeModal" 
            aria-hidden="true" 
            aria-labelledby="inputTaskTypeModalLabel" 
            tabIndex="-1"
            
        >
            <div className="modal-dialog modal-dialog-centered" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Task Type</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" >
                        <p className='mb-3'>Select a task type</p>
                        <Form.Select size="sm" className='my-4' onChange={(e) => setSelectedTaskType(e.target.value)}>
                            <option value={"NEW_PUMP_INQUIRY"}>NEW_PUMP_INQUIRY</option>
                            <option value={"SERVICE_TASK"}>SERVICE_TASK</option>
                        </Form.Select>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-target="#inputTaskPriorityModal" data-bs-toggle="modal">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectTaskType