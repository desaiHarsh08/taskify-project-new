import React from 'react'
import { Form } from 'react-bootstrap'

const SelectFunction = ({ functionFormat, selectedFunctionFormat, handleChange }) => {
    return (
        <Form.Select 
            size="sm" 
            className='my-4'
            onChange={handleChange}
            value={selectedFunctionFormat?.function_title}
        >
            {functionFormat?.task_functions?.map((func, index) => (
                <option key={`function-option-${index}`} value={func?.function_title}>
                    {func?.function_title} --- [{func?.function_department}]
                </option>
            ))}
        </Form.Select>
    )
}

export default SelectFunction