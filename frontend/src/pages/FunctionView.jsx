import React, { useEffect, useState } from 'react'
import { Accordion, Alert, Badge, Container, Table } from 'react-bootstrap'
import Button from '../components/ui/Button'
import Form from 'react-bootstrap/Form';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import FieldRow from '../components/function-view/FieldRow';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../apis/taskApis';
import MyToast from '../components/ui/MyToast';
import { updateFunctionField } from '../apis/functionFieldApis';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchAgainStatus, setFetchAgainStatus } from '../app/features/fetchAgainSlice';
import AlertDialog from '../components/ui/AlertDialog';
import { fetchFunctionFormat, updateFunction } from '../apis/functionApis';
import MyModal from '../components/ui/MyModal';
import InputFunctionField from '../components/task/InputFunctionField';

const FunctionView = () => {
    const { taskId, functionId } = useParams();

    const dispatch = useDispatch();

    const fetchAgainStatus = useSelector(selectFetchAgainStatus);

    const [task, setTask] = useState();
    const [taskFunction, setTaskFunction] = useState();
    const [showToast, setShowToast] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const [message, setMessage] = useState('');
    const [canMarkFunction, setCanMarkFunction] = useState(false);
    const [choiceFnTemplate, setChoiceFnTemplate] = useState();

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchTaskById(taskId);
            console.log(data);
            if (data) {
                // Set the task
                setTask(data);
                // Set the function
                const myFunction = data?.functions?.find(func => func?.id == functionId);
                setTaskFunction(myFunction);
                const tmp = myFunction.functionFields.filter(field => field.isCompleted != true);
                if (tmp.length > 0) {
                    setCanMarkFunction(false);
                } else {
                    setCanMarkFunction(true)
                }

                const { data: fnTemplate, error: fnError } = await fetchFunctionFormat(data?.taskType);
                console.log("func formats:", fnTemplate)
                const choiceFn = fnTemplate?.task_functions.find(fn => fn?.choice == true);
                if (choiceFn) {
                    setChoiceFnTemplate(choiceFn);
                }
            }
        })()
    }, [fetchAgainStatus])

    const handleFunctionChange = (e, fieldIndex, fieldColumnIndex) => {
        const { name, value } = e.target;
        console.log(name, value)
        const newFunctionFields = taskFunction?.functionFields?.map((functionField, index) => {
            if (index === fieldIndex) {
                const newFieldColumns = functionField.fieldColumns.map((fieldColumn, idx) => {
                    if (idx === fieldColumnIndex) {
                        const newFieldColumn = { ...fieldColumn, [name]: value }
                        return newFieldColumn;
                    }
                    return fieldColumn;
                })
                return { ...functionField, fieldColumns: [...newFieldColumns] };
            }
            return functionField;
        })

        console.log("updated values:", {
            ...taskFunction,
            functionFields: newFunctionFields
        })
        setTaskFunction({
            ...taskFunction,
            functionFields: [...newFunctionFields]
        });
    }

    const handleSaveFunctionField = async (field, action) => {
        console.log(field)
        const { data, error } = await updateFunctionField(field);
        console.log("updated field:", data);
        if (data) {
            setShowToast(true);
            setMessage(`Field ${action}!`);
            dispatch(setFetchAgainStatus());
        }
    }

    const handleDoneFunction = async () => {
        const newTaskFunction = { ...taskFunction }
        console.log('in done func:', newTaskFunction)
        // Check whether all fields are complete
        const notCompletedArr = newTaskFunction.functionFields.filter(field => field.isCompleted != true);
        if (notCompletedArr.length > 0) {
            return;
        }

        newTaskFunction.isCompleted = true;
        console.log("newTaskFunction:", newTaskFunction)

        const { data, error } = await updateFunction(newTaskFunction);
        if (data) {
            console.log("done function:", data);
            setTaskFunction(newTaskFunction);
            setShowToast(true);
            setMessage("Function Done!");
        }

    }

    return (
        <Container fluid className='p-0 bor der bord er-danger h-h-auto'>
            <div className="border-bottom pb-3">
                <h2 className='d-flex gap-3 align-items-center'>
                    <p>Function: </p>
                    <p className='bg-body-secondary p-1 px-2 rounded'>{taskFunction?.functionTitle}</p>
                </h2>
                <Badge className='mb-2'>{taskFunction?.functionDepartment}</Badge>
                <br />
                {!taskFunction?.isCompleted &&
                    <div className='mr-2 mt-3 d-flex align-items-center gap-2'>
                        <Button
                            handleClick={() => setShowDone(true)}
                            size='btn-sm'
                            variant={`${taskFunction?.isCompleted ? 'success' : 'secondary'}`}
                            disabled={!canMarkFunction}
                        >Done</Button>
                        <AlertDialog
                            show={showDone}
                            onHide={() => setShowDone(false)}
                            alertHeading='Done?'
                            message='Mark the function as done!'
                            handleContinue={handleDoneFunction}

                        />



                        {/* <Button
                            handleClick={() => setShowDE(true)}
                            size='btn-sm'
                            variant={`danger`}
                            disabled={taskFunction?.isCompleted}
                        >Delete</Button> */}
                    </div>

                }
            </div>
            <div className='my-2'>
                <h5 className='m-0 p-0'>Description</h5>
                <p className=''>{taskFunction?.functionDescription}</p>
            </div>
            <div className='d-flex gap-3 p-2 my-3'>
                {/* {choiceFnTemplate && (
                    <>
                        <Form.Select aria-label="Default select example" className='w-25'>
                            {taskFunction?.functionFields?.map((field, index) => (
                                <option key={`field-option-${index}`} value={field?.fieldTitle}>{field?.fieldTitle}</option>
                            ))}
                        </Form.Select>
                        <Button>Add</Button>
                        <MyModal
                            show={showAddFunctionFieldModal}
                            onHide={() => setShowAddFunctionFieldModal(false)}
                            modalHeading={`Function: ${selectedFunctionFormat?.function_title}`}
                            showModalFooter={true}
                            showBackBtn={true}
                            handleBack={() => {
                                setShowAddFunctionFieldModal(false)
                                setShowAssignTaskModal(false)
                                setShowAddFunctionModal(true)
                            }}
                            handleContinue={() => {
                                setShowAddFunctionModal(false)
                                setShowAddFunctionFieldModal(false)
                                setShowAssignTaskModal(true)
                            }}
                        >
                            <InputFunctionField
                                selectedFunctionFormat={selectedFunctionFormat}
                                newFunction={newFunction}
                                handleFunctionChange={handleFunctionChange}
                                setNewFunction={setNewFunction}
                                handleDueDate={handleDueDate}
                            />
                        </MyModal>
                    </>
                )
                } */}
            </div>
            <div style={{ overflow: "auto" }}>
                <Table bordered style={{ minWidth: "1245px", }}>
                    <thead >
                        <tr className='text-center'>
                            <th className='bg-body-secondary'>Sr. No.</th>
                            <th className='bg-body-secondary'>Title</th>
                            <th className='bg-body-secondary'>Description</th>
                            <th className='bg-body-secondary'>Created At</th>
                            <th className='bg-body-secondary'>Last Edited</th>
                            <th className='bg-body-secondary'>Status</th>
                            <th className='bg-body-secondary'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskFunction?.functionFields?.map((field, index) => (
                            <FieldRow
                                key={`field-row-${index}`}
                                field={field}
                                index={index}
                                taskFunction={taskFunction}
                                handleFunctionChange={handleFunctionChange}
                                handleSaveFunctionField={handleSaveFunctionField}
                            />
                        ))}

                    </tbody>
                </Table>
            </div>
            <MyToast show={showToast} message={message} onClose={() => setShowToast(false)} />
        </Container>
    )
}

export default FunctionView