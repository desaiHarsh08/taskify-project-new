import React, { useState } from 'react'
import Button from '../ui/Button'
import { FaEdit } from 'react-icons/fa'
import MyModal from '../ui/MyModal'
import EditFieldColumns from '../function-view/EditFieldColumns'
import AlertDialog from '../ui/AlertDialog'
import { MdDeleteOutline } from 'react-icons/md'
import EditCustomer from './EditCustomer'
import { deleteCustomer } from '../../apis/customerApis'

const CustomerRow = ({ 
    customer, 
    index, 
    handleChangeCustomer, 
    handleSaveCustomer,
    handleDeleteCustomer,
}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    return (
        <tr>
            <td className='text-center' style={{ widtd: "5%" }}>{index + 1}.</td>
            <td className='text-center' style={{ widtd: "10%" }}>C-{customer?.customerTmpId}</td>
            <td className='text-center' style={{ widtd: "15%" }}>{customer?.customerName}</td>
            <td className='text-center' style={{ widtd: "15%" }}>{customer?.personOfContact}</td>
            <td className='text-center' style={{ widtd: "10%" }}>{customer?.phone}</td>
            <td className='text-center' style={{ widtd: "10%" }}>
            {customer?.address}
            </td>
            <td className='text-center' style={{ widtd: "5%" }}>{customer?.city}</td>
            <td className='text-center' style={{ widtd: "5%" }}>{customer?.pincode}</td>
            <td className='d-flex gap-2 align-items-center w-100 h-100 py-2 pb-4 justify-content-center' style={{ widtd: "10%" }}>
                <Button
                    size='btn-sm'
                    variant='success'
                    padding='px-2 py-1'
                    handleClick={() => setShowEditModal(true)}
                >
                    <FaEdit />
                </Button>
                <MyModal
                    modalHeading={`Edit: Customer #${customer.customerTmpId}`}
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    showModalFooter={true}
                    showBackBtn={false}
                    handleContinue={() => {
                        console.log("edit customer")
                        handleSaveCustomer(customer)
                        setShowEditModal(false)
                    }}
                >
                    <EditCustomer 
                        index={index}
                        customer={customer} 
                        handleChangeCustomer={handleChangeCustomer} 
                    />
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
                    alertHeading='Delete: Customer ?'
                    message='This action can not be undone and will permanently remove the field from the app.'
                    cancelBtnShow={true}
                    handleContinue={() => handleDeleteCustomer(customer.id)}
                />
            </td>
        </tr>
    )
}

export default CustomerRow