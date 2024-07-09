// eslint-disable-next-line react/prop-types
const AddCustomerDetails = ({ customerInfo, setCustomerInfo }) => {
    const handleCustomerChange = (e) => {
        const { name, value } = e.target;

        setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="modal fade"
            id="customerInfoModal"
            aria-hidden="true"
            aria-labelledby="customerInfoModal"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="customerInfoModalToggleLabel2"
                        >
                            Customer Information
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column gap-2">
                            <div className="form-group">
                                <label htmlFor="customerTmpId">
                                    Customer Id
                                </label>
                                <input
                                    type="text"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.customerTmpId}
                                    name="customerTmpId"
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="customerTmpId"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.email}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerName">
                                    Name of the Customer
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.customerName}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="customerName"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="personOfContact">
                                    Person of Contact
                                </label>
                                <input
                                    type="text"
                                    name="personOfContact"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.personOfContact}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="personOfContact"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Mobile Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.phone}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="phone"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.address}
                                    name="address"
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.city}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="city"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    // eslint-disable-next-line react/prop-types
                                    value={customerInfo?.pincode}
                                    onChange={handleCustomerChange}
                                    className="form-control"
                                    id="pincode"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-target="#inputTaskPriorityModal"
                            data-bs-toggle="modal"
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-target="#taskInfoDetailsModal"
                            data-bs-toggle="modal"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomerDetails;
