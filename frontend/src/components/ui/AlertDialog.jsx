import React, { useState } from 'react'

import MyModal from './MyModal'
import Button from './Button';

const AlertDialog = ({
    onHide = () => {},
    show = false,
    alertHeading = "Confirmation",
    message = "This is a default alert message being displayed",
    handleContinue = () => {},
    cancelBtnShow = true,
}) => {

    return (
        <MyModal
            show={show}
            onHide={onHide}
            modalHeading={"Alert"}
            backdrop="static"
            showModalHeader={false}
            keyboard={false}
        >
            <h3 className='m-0'>{alertHeading}</h3>
            <div className='my-4'>
                <p style={{ fontSize: "16px" }}>{message}</p>
            </div>
            <div className='d-flex justify-content-end gap-2 mb-3'>
                <Button
                    variant="light"
                    handleClick={onHide}
                >Cancel</Button>
                <Button
                    variant="secondary"
                    handleClick={() => {
                        onHide()
                        handleContinue()
                    }}
                >Continue</Button>
            </div>
        </MyModal>
    )
}

export default AlertDialog