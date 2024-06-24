import React from 'react'

const AddCustomerDetails = ({customerInfo, setCustomerInfo}) => {
    const handleCustomerChange = (e) => {
        const { name, value } = e.target;

        setCustomerInfo(prev => ({...prev, [name]: value}));
    }
  return (
    <div className="modal fade" id="customerInfoModal" aria-hidden="true" aria-labelledby="customerInfoModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="customerInfoModalToggleLabel2">Customer Information</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" >
                        <div className='d-flex flex-column gap-2'>
                            <div class="form-group">
                                <label for="customerTmpId">Customer Id</label>
                                <input 
                                    type="text" 
                                    value={customerInfo?.customerTmpId} 
                                    name='customerTmpId'
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="customerTmpId"  
                                />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input 
                                    type="text" 
                                    name='email'
                                    value={customerInfo?.email}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="email" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="customerName">Name of the Customer</label>
                                <input 
                                    type="text" 
                                    name='customerName'
                                    value={customerInfo?.customerName}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="customerName" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="personOfContact">Person of Contact</label>
                                <input 
                                    type="text" 
                                    name='personOfContact'
                                    value={customerInfo?.personOfContact}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="personOfContact" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="phone">Mobile Number</label>
                                <input 
                                    type="text" 
                                    name='phone'
                                    value={customerInfo?.phone}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="phone" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <textarea 
                                    value={customerInfo?.address} 
                                    name='address'
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="address" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="city">City</label>
                                <input 
                                    type='text' 
                                    name='city'
                                    value={customerInfo?.city}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="city" 
                                />
                            </div>
                            <div class="form-group">
                                <label for="pincode">Pincode</label>
                                <input 
                                    type='text' 
                                    name='pincode'
                                    value={customerInfo?.pincode}
                                    onChange={handleCustomerChange}
                                    class="form-control" 
                                    id="pincode" 
                                />
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-target="#inputTaskPriorityModal" data-bs-toggle="modal">Back</button>
                        <button className="btn btn-primary" data-bs-target="#taskInfoDetailsModal" data-bs-toggle="modal">Continue</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddCustomerDetails