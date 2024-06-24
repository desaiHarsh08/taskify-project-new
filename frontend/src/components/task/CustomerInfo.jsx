import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import MyModal from '../ui/MyModal'
import EditCustomer from '../customers/EditCustomer'
import { fetchCustomerById } from '../../apis/customerApis'

const CustomerInfo = ({ customer, setCustomer, handleCustomerChange, handleSave }) => {
    const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);

    return (
        <ul className='my-3 mb-5 p-0 d-flex flex-column gap-2' style={{ listStyle: "none" }}>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Name:</p>
                <p className='p-1 px-2'>{customer?.customerName}</p>
            </li>

            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Person Of Contact:</p>
                <p className='p-1 px-2'>{customer?.personOfContact}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Phone:</p>
                <p className='p-1 px-2'>{customer?.phone}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Address:</p>
                <p className='p-1 px-2'>{customer?.address}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>City:</p>
                <p className='p-1 px-2'>{customer?.city}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>
                <p style={{ minWidth: "132px" }}>Pincode:</p>
                <p className='p-1 px-2'>{customer?.pincode}</p>
            </li>
            <li className='d-flex gap-2 align-items-center rounded'>

                <Button handleClick={() => setShowEditCustomerModal(true)}>Edit</Button>
                <MyModal
                    modalHeading='Edit: Customer #1'
                    show={showEditCustomerModal}
                    onHide={() => setShowEditCustomerModal(false)}
                    showModalFooter={true}
                    showBackBtn={false}
                    handleContinue={() => {
                        console.log("edit customer")
                        handleSave()
                        setShowEditCustomerModal(false)
                    }}
                >
                    <EditCustomer
                        customer={customer}
                        setCustomer={setCustomer}
                        handleChangeCustomer={handleCustomerChange}
                        
                    />
                </MyModal>
            </li>
        </ul>
    )
}

export default CustomerInfo