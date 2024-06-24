import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import CustomerRow from './CustomerRow'
import { deleteCustomer, fetchAllCustomers, updateCustomer } from '../../apis/customerApis';
import MyToast from '../ui/MyToast';

const CustomerList = ({
    allCustomers,
    customer,
    handleChangeCustomer,
    handleSaveCustomer,
    handleDeleteCustomer
}) => {

    useEffect(() => {}, [allCustomers])

    return (
        <Table bordered style={{minWidth: "1100px"}}>
            <thead>
                <tr className='text-center'>
                    <th className='bg-body-secondary' style={{ width: "5%" }}>Sr. No.</th>
                    <th className='bg-body-secondary' style={{ width: "10%" }}>Customer Id</th>
                    <th className='bg-body-secondary' style={{ width: "15%" }}>Name</th>
                    <th className='bg-body-secondary' style={{ width: "15%" }}>Person Of Contact</th>
                    <th className='bg-body-secondary' style={{ width: "10%" }}>Mobile</th>
                    <th className='bg-body-secondary' style={{ width: "10%" }}>Address</th>
                    <th className='bg-body-secondary' style={{ width: "5%" }}>City</th>
                    <th className='bg-body-secondary' style={{ width: "5%" }}>Pincode</th>
                    <th className='bg-body-secondary' style={{ width: "10%" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allCustomers?.map((customer, index) => (
                    <CustomerRow 
                        key={`customer-${index}`} 
                        customer={customer} 
                        handleSaveCustomer={handleSaveCustomer}
                        index={index} 
                        handleChangeCustomer={handleChangeCustomer}
                        handleDeleteCustomer={handleDeleteCustomer}
                    />
                ))}
            </tbody>
        </Table>
    )
}

export default CustomerList