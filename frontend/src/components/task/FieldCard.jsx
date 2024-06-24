import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'

const FieldCard = ({ field, fieldIndex, newFunction, handleFunctionChange }) => {
    console.log(newFunction?.functionFields[fieldIndex]?.fieldColumns)
    useEffect(() => { }, [newFunction]);
    return (
        <div className='card m-2 my-4'>
            <div className='card-header p-2'>
                <h5 className='fs-6 d-flex gap-3 align-items-center '>
                    <p className='fw-bold'>Field: </p>
                    <p className='fw-normal'>{field?.ff_title}</p>
                </h5>
            </div>
            <div className="card-body">
                {field?.ff_columns?.length === 0 && <p>{field?.ff_description}</p>}
                {field?.ff_columns?.map((fieldColumn, idx) => (

                    <Form.Group key={`field-column-${idx}`} className="mb-3" controlId={`field-column-${idx}`}>
                        {/* {console.log("field-card: fieldColumn = ", fieldColumn)} */}
                        <Form.Label>{fieldColumn?.name}</Form.Label>
                        {!fieldColumn?.large_text == true ?
                            fieldColumn?.type === "FILE" ?
                                <Form.Control
                                    type="file"
                                    name="value"
                                    multiple={fieldColumn?.multipleFiles}
                                    onChange={(e) => {
                                        console.log("changing...")
                                        handleFunctionChange(e, fieldIndex, idx)

                                    }}
                                />
                                :
                                (fieldColumn?.type !== "BOOLEAN" ? <Form.Control
                                    type={(
                                        fieldColumn?.type === "STRING" ? "text" : (
                                            fieldColumn?.type === "NUMBER" ? "number" : "date"
                                        )
                                    )}
                                    name="value"
                                    value={newFunction?.functionFields[fieldIndex]?.fieldColumns[idx]?.value}
                                    onChange={(e) => {
                                        console.log("changing...")
                                        handleFunctionChange(e, fieldIndex, idx)
                                    }
                                    }
                                />
                                    : <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        label="Check this switch"
                                        name='value'
                                        checked={(newFunction?.functionFields[fieldIndex]?.fieldColumns[idx]?.value === 'true' ? true : false)}
                                        onChange={(e) => {
                                            console.log('checked:', e.target.checked)
                                            handleFunctionChange(e, fieldIndex, idx)
                                        }

                                        }
                                    />)

                            :
                            <Form.Control
                                type={"text"}
                                as={"textarea"}
                                name="value"
                                value={newFunction?.functionFields[fieldIndex]?.fieldColumns[idx]?.value}
                                onChange={(e) => handleFunctionChange(e, fieldIndex, idx)}
                            />

                        }
                    </Form.Group>
                ))}
            </div>
        </div>
    )
}

export default FieldCard