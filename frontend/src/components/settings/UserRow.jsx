import React, { useState } from 'react'
import { Badge, Table } from 'react-bootstrap'
import AlertDialog from '../ui/AlertDialog'
import Button from '../ui/Button';
import { FaEdit } from 'react-icons/fa';
import MyModal from '../ui/MyModal';
import { MdDeleteOutline } from 'react-icons/md';
import EditUser from './EditUser';

const UserRow = ({ user, index, handleChangeUser, handleSaveUser }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <tr>
            <td className='text-center' style={{ width: "5%" }}>{index + 1}.</td>
            <td className='text-center' style={{ width: "15%" }}>{user?.name}</td>
            <td className='text-center' style={{ width: "15%" }}>
                {user?.isAdmin ? '-' : <Badge>{user?.department}</Badge>}
            </td>
            <td className='text-center' style={{ width: "15%" }}>{user?.email}</td>
            <td className='text-center' style={{ width: "10%" }}>{user?.phone}</td>
            <td className='text-center' style={{ width: "10%" }}>
                <p className='rounded' style={{background: user?.isDisabled ? "#f5a7b5" : "#a7f5d1"}}>{user?.isDisabled ? 'YES' : "NO"}</p>
            </td>
            <td className='d-flex gap-2 align-items-center w-100 h-100 justify-content-center' style={{ widtd: "10%" }}>
                <Button
                    size='btn-sm'
                    variant='success'
                    padding='px-2 py-1'
                    handleClick={() => setShowEditModal(true)}
                >
                    <FaEdit />
                </Button>
                <MyModal
                    modalHeading='Edit: User'
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    showModalFooter={true}
                    showBackBtn={false}
                    handleContinue={() => {
                        console.log('edit user')
                        setShowEditModal(false)
                        handleSaveUser(user)
                    }}
                >
                    <EditUser 
                        user={user} 
                        index={index}
                        handleChangeUser={handleChangeUser} 
                    />
                </MyModal>
            </td>
        </tr>
    )
}

export default UserRow