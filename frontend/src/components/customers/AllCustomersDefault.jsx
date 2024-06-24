import React, { useEffect, useState } from 'react'
import MyPagination from '../ui/MyPagination';
import CustomerList from './CustomerList';
import { deleteCustomer, fetchAllCustomers, updateCustomer } from '../../apis/customerApis';
import MyToast from '../ui/MyToast';

const AllCustomersDefault = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [allCustomers, setAllCustomers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [pageResponse, setPageResponse] = useState()

    // Fetch all the customers
    useEffect(() => {
        (async () => {
            console.log('fetching customers')
            const { data, error } = await fetchAllCustomers(pageNumber)
            console.log("res:", data)
            setPageResponse(data);
            console.log("customers:", data.content)
            setAllCustomers(data.content);

        })();
    }, [pageNumber]);

    const handleChangeCustomer = (index, e) => {
        console.log('fired', index, e)
        const { name, value } = e.target;

        const newAllCustomers = allCustomers.map((customer, idx) => {
            if (idx === index) {
                const updatedCustomer = {
                    ...customer,
                    [name]: value
                }
                return updatedCustomer;
            }

            return customer;
        })

        setAllCustomers(newAllCustomers);
    }

    const handleSaveCustomer = async (customer) => {
        const { data, error } = await updateCustomer(customer);
        console.log("customer updated:", data);
        if (data) {
            setMessage("Customer updated!");
        }
    }

    const handleDeleteCustomer = async (customerId) => {
        const { data, error } = await deleteCustomer(customerId);
        if (data) {
            console.log("deleted!");
            const newAllCustomers = allCustomers.filter((customer, index) => customer.id !== customerId);
            setAllCustomers(newAllCustomers);
            setShowToast(true);
            setMessage("Customer deleted!");
        }
    }

    return (
        <div className='h-100'>
            <div className='border-bottom my-3 pb-2'>
                <h2>Customers</h2>
                <p>View all of your customers here</p>
            </div>
            {allCustomers?.length > 0 ?
                <>
                    <div className='h-75 mb-3 overflow-auto'>
                        <CustomerList
                            allCustomers={allCustomers}
                            handleChangeCustomer={handleChangeCustomer}
                            handleSaveCustomer={handleSaveCustomer}
                            handleDeleteCustomer={handleDeleteCustomer}
                        />
                    </div>
                    <MyPagination
                        lastPage={pageResponse?.lastPage}
                        pageNumber={pageNumber}
                        totalEntries={pageResponse?.totalEntries}
                        totalPages={pageResponse?.totalPages}
                        setPageNumber={setPageNumber}
                    />
                </> : <p>No customer exist!</p>
            }

            {showToast &&
                <MyToast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    message={message}
                />
            }
        </div>
    )
}

export default AllCustomersDefault