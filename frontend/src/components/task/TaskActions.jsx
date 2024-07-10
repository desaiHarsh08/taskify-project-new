import React, { useState } from 'react'
import Button from '../ui/Button'
import MyModal from '../ui/MyModal'
import EditTask from './EditTask'
import AssignTask from './AssignTask'
import AlertDialog from '../ui/AlertDialog'
import { deleteTask, updateTask } from '../../apis/taskApis'
import { useNavigate } from 'react-router-dom'
import { setFetchAgainStatus } from '../../app/features/fetchAgainSlice'
import { useDispatch } from 'react-redux'
import { setLoadingState } from '../../app/features/loadingSlice'

const TaskActions = ({
    task, setTask, allUsers
}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const [showDoneTaskModal, setShowDoneTaskModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(allUsers[0]);

    const handleDeleteTask = async (taskId) => {
        const { data, error } = await deleteTask(taskId)
        if (data) {
            console.log("deleted task:", data);
            setShowToast(true);
            setMessage('Task Deleted!');
            navigate(`/home/tasks`);
        }
    }

    const handleDoneTask = async (task) => {
        const updatedTask = { ...task, isCompleted: true }
        console.log(updatedTask)
        dispatch(setLoadingState(true));
        const { data, error } = await updateTask(updatedTask);
        dispatch(setLoadingState(false));
        console.log("done: ", data);
        if (data) {
            setShowToast(true);
            setMessage('Task marked as done!');
            setTask(updatedTask)
        }
    }

    const handleChangeTask = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handleSave = async () => {
        const { data, error } = await updateTask(task);
        if (data) {
            dispatch(setFetchAgainStatus());
            setShowToast(true);
            setMessage('Task saved!');
        }
    }

    return (
        <div className='d-flex gap-3 py-3'>
            {!task?.isCompleted &&
                <>

                    <Button size='btn-sm' variant='primary' handleClick={() => setShowEditTaskModal(true)}>Edit</Button>
                    <MyModal
                        show={showEditTaskModal}
                        onHide={() => setShowEditTaskModal(false)}
                        modalHeading="Edit Task"
                        showModalFooter={true}
                        showBackBtn={false}
                        handleContinue={() => {
                            console.log("add function!")
                            setShowEditTaskModal(false)
                            setShowAssignTaskModal(true)
                        }}
                    >
                        <EditTask
                            handleChangeTask={handleChangeTask}
                            handleSave={handleSave}
                            setShowToast={setShowToast}
                            setMessage={message}

                            task={task}
                        />
                    </MyModal>
                    <MyModal
                        show={showAssignTaskModal}
                        onHide={() => setShowAssignTaskModal(false)}
                        modalHeading="Assign Task"
                        showModalFooter={true}
                        showBackBtn={true}
                        handleContinue={() => {
                            console.log("edit function!")
                            handleSave()
                            setShowAssignTaskModal(false)
                        }}
                        handleBack={() => {
                            setShowAssignTaskModal(false)
                            setShowEditTaskModal(true)
                        }}
                    >
                        <AssignTask
                            task={task}
                            allUsers={allUsers}

                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                    </MyModal>
                    <Button size='btn-sm' variant='danger' handleClick={() => setShowDeleteTaskModal(true)}>Delete</Button>
                    <AlertDialog
                        onHide={() => setShowDeleteTaskModal(false)}
                        show={showDeleteTaskModal}
                        alertHeading='Delete Task?'
                        handleContinue={() => handleDeleteTask(task?.id)}
                        message='This action can not be undone and will permanently remove the field from the app.'
                        cancelBtnShow={true}
                    />
                    <Button size='btn-sm' variant='secondary' handleClick={() => {
                        console.log("Done...");
                        setShowDoneTaskModal(true)
                    }}>Done</Button>
                    <AlertDialog
                        onHide={() => setShowDoneTaskModal(false)}
                        show={showDoneTaskModal}
                        alertHeading='Done Task?'
                        message='This action can not be undone and will permanently remove the field from the app.'
                        cancelBtnShow={true}
                        handleContinue={() => handleDoneTask(task)}

                    />
                </>
            }
        </div>
    )
}

export default TaskActions