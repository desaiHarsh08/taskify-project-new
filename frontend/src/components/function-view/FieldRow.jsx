import React, { useState } from 'react'
import Button from '../ui/Button'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { Badge } from 'react-bootstrap'
import MyModal from '../ui/MyModal'
import EditFieldColumns from './EditFieldColumns'
import AlertDialog from '../ui/AlertDialog'
import { getFormattedDate } from '../../utils/helper'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { setFetchAgainStatus } from '../../app/features/fetchAgainSlice'

const FieldRow = ({ taskFunction, field, index, handleFunctionChange, handleSaveFunctionField }) => {
    const dispatch = useDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showDoneDialog, setShowDoneDialog] = useState(false);

    const handleDone = (field) => {
        const newField = { ...field, isCompleted: true }
        handleSaveFunctionField(newField, "Done!");
        setShowDoneDialog(false)
        dispatch(setFetchAgainStatus());
    }

    return (
        <tr className='text-center'>
            <td className='pt-3' style={{ width: "5%" }}>{index + 1}.</td>
            <td className='pt-3' style={{ width: "10%" }}>{field?.fieldTitle}</td>
            <td className='' style={{ width: "45%" }}>{field?.fieldDescription}</td>
            <td className='pt-3' style={{ width: "10%" }}>{getFormattedDate(field?.fieldCreated)}</td>
            <td className='pt-3' style={{ width: "10%" }}>{getFormattedDate(field?.lastEdited)}</td>
            <td className='pt-3' style={{ width: "5%" }}>
                <p style={{
                    background: field?.isCompleted ? '#a7f5d1' : '#ffc107',
                    fontSize: "12px",
                    padding: "3px 5px",
                    borderRadius: "7px"
                }}>{field?.isCompleted ? "CLOSED" : "IN_PROGRESS"}</p>
            </td>
            <td className='d-flex gap-2 align-items-center w-100 h-100 py-2 pb-4 justify-content-center'>
                {!taskFunction?.isCompleted && field?.isCompleted != true &&
                    <>

                        <Button
                            size='btn-sm'
                            variant='success'
                            padding='px-2 py-1'
                            handleClick={() => setShowEditModal(true)}
                        >
                            <FaEdit />
                        </Button>
                        <MyModal
                            modalHeading={`Edit: #${index + 1} ${field?.fieldTitle}`}
                            show={showEditModal}
                            onHide={() => setShowEditModal(false)}
                            showModalFooter={true}
                            handleContinue={() => {
                                handleSaveFunctionField(field, "Edited!")
                                setShowEditModal(false)
                            }}
                        >
                            <EditFieldColumns field={field} index={index} handleFunctionChange={handleFunctionChange} />
                        </MyModal>
                        <Button
                            size='btn-sm'
                            variant='danger'
                            padding='px-2 py-1'
                            handleClick={() => setShowDeleteDialog(true)}
                        >
                            <MdDeleteOutline />
                        </Button>
                        <AlertDialog
                            onHide={() => setShowDeleteDialog(false)}
                            show={showDeleteDialog}
                            alertHeading='Delete: Client Details ?'
                            message='This action can not be undone and will permanently remove the field from the app.'
                            cancelBtnShow={true}

                        />

                        <Button
                            size='btn-sm'
                            variant={`${field?.isCompleted ? 'success' : 'light'}`}
                            padding='px-2 py-1'
                            handleClick={() => setShowDoneDialog(true)}
                        >

                            <IoIosCheckmarkCircleOutline />
                        </Button>
                        <AlertDialog
                            onHide={() => setShowDoneDialog(false)}

                            show={showDoneDialog}
                            alertHeading='Done: Mark as done ?'
                            message='This action can not be undone and will permanently mark the field as done.'
                            cancelBtnShow={true}
                            handleContinue={() => { handleDone(field) }}
                        />
                    </>
                }

            </td>
        </tr>
    )
}

export default FieldRow