import React, { useEffect, useState } from 'react'
import { Badge, Form } from 'react-bootstrap'
import FieldCard from './FieldCard';

const InputFunctionField = ({ selectedFunctionFormat, newFunction, handleFunctionChange, setNewFunction, handleDueDate }) => {
    const [selectedFunctionField, setSelectedFunctionField] = useState();

    useEffect(() => {
        console.log("in ue of input_function_field, selectedFunctionFormat:", selectedFunctionFormat)
        if (selectedFunctionFormat?.choice === true) {
            console.log("selectedFunctionFormat?.function_fields[0] = ", selectedFunctionFormat?.function_fields[0])
            setSelectedFunctionField(selectedFunctionFormat?.function_fields[0]);
        }
    }, []);

    const handleSelectChange = (e) => {
        const selectedField = selectedFunctionFormat?.function_fields.find(field => field.ff_title === e.target.value);
        console.log("selectedField:", selectedField);
        const tmpNewFunction = { ...newFunction }
        // tmpNewFunction.functionFields = [selectedField]
        console.log("in select field, function:", tmpNewFunction)

        const functionField = {
            fieldTitle: selectedField["ff_title"],
            fieldDescription: selectedField["ff_description"],
            functionId: 0, // TO SET
            fieldCreated: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            fieldColumns: selectedField.ff_columns.map(column => ({
                type: column?.type,
                name: column?.name,
                value: null,
                files: [],
                forwardFileToEmail: null,
                largeText: false,
                unique: column?.unique,
                autoAssign: column?.auto_assign,
                multipleFiles: column?.multiple_files,
                functionFieldId: 0, // TO SET
                lastEdited: new Date().toISOString()
            }))
        };

        tmpNewFunction.functionFields = [functionField]

        setNewFunction(tmpNewFunction);

        setSelectedFunctionField(selectedField);
    }


    return (
        <>
            <div className='mb-3 border-bottom pb-3'>
                <p className='fw-bold mb-1'>Description</p>
                <p>{selectedFunctionFormat?.function_description}</p>
                <Badge className='mt-3'>{selectedFunctionFormat?.function_department}</Badge>
            </div>
            <Form>
                <Form.Group size="sm" className='mb-4 mt-1'>
                <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        onChange={handleDueDate}
                    />
                </Form.Group>
                {selectedFunctionFormat?.choice === true &&
                    <Form.Group size="sm" className='mb-4 mt-1'>
                        <Form.Label>Select Field</Form.Label>
                        <Form.Select
                            size="sm"
                            disabled={!selectedFunctionFormat?.choice === true}
                            onChange={handleSelectChange}
                        >
                            {selectedFunctionFormat?.function_fields.map((field, index) => (
                                <option value={field?.ff_title}>{field?.ff_title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                }
                {!selectedFunctionFormat?.choice === true && selectedFunctionFormat.function_fields.map((field, index) => (
                    <FieldCard
                        key={`field-${index}`}
                        field={field}
                        newFunction={newFunction}
                        handleFunctionChange={handleFunctionChange}
                        fieldIndex={index}
                    />
                ))}

                {selectedFunctionFormat?.choice === true && selectedFunctionField &&
                    <FieldCard
                        field={selectedFunctionField}
                        newFunction={newFunction}
                        handleFunctionChange={handleFunctionChange}
                        fieldIndex={0}
                    />
                }
            </Form>
        </>

    )
}

export default InputFunctionField