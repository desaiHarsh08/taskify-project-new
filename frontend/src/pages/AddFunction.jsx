import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button';
import MyModal from '../components/ui/MyModal';
import SelectFunction from '../components/task/SelectFunction';
import InputFunctionField from '../components/task/InputFunctionField';
import AssignTask from '../components/task/AssignTask';
import { createFunction, fetchFunctionFormat } from '../apis/functionApis';
import { addCustomer, fetchCustomerById } from '../apis/customerApis';
import { fetchAllUsers } from '../apis/authApis';
import MyToast from '../components/ui/MyToast';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchAgainStatus } from '../app/features/fetchAgainSlice';
import { updateTask } from '../apis/taskApis';
import { selectUser } from '../app/features/userSlice';
import { useUser } from '../hooks/useUser';

const getAllUsers = async () => {
    const { data, error } = await fetchAllUsers();
    console.log(data);
    return { data, error }
}

const AddFunction = ({ task, fetchTask }) => {
    const dispatch = useDispatch();

    const user = useUser();
    console.log("(( user", user)

    const [allUsers, setAllUsers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [usersArr, setUsersArr] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [functionFormat, setFunctionFormat] = useState();
    const [selectedFunctionFormat, setSelectedFunctionFormat] = useState();
    const [showAddFunctionModal, setShowAddFunctionModal] = useState(false);
    const [showAddFunctionFieldModal, setShowAddFunctionFieldModal] = useState(false);
    const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
    const [newFunction, setNewFunction] = useState({
        functionTitle: selectedFunctionFormat?.function_title,
        functionDescription: selectedFunctionFormat?.function_description,
        functionDepartment: selectedFunctionFormat?.function_department,
        addedDate: new Date().toISOString(),
        assignedUserId: 0, // TO SET
        createdByUserId: user?.id,
        dueDate: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
        taskId: task?.id,
        functionFields: [{
            fieldTitle: '',
            fieldDescription: '',
            fieldCreated: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            fieldColumns: [{
                type: '',
                name: '',
                files: [],
                value: null,
                forwardFileToEmail: '', // TO SET
                largeText: false,
                unique: false,
                autoAssign: false,
                multipleFiles: false,
                lastEdited: new Date().toISOString()
            }]
        }]
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await getAllUsers();
            if (data) {
                console.log(data);
                setAllUsers(data);
                setUsersArr(data);
                setSelectedUser(data[0].id);
            }
            if (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchFunctionFormat(task?.taskType);
            console.log("function_format:", data);
            if (data) {
                setFunctionFormat(data);
                setSelectedFunctionFormat(data.task_functions[0]);

                const tmpFunctionFormat = data.task_functions[0]
                // Set the initial values for `newFunction`
                const updatedNewFunction = { ...newFunction }
                updatedNewFunction.functionTitle = tmpFunctionFormat?.function_title
                updatedNewFunction.functionDescription = tmpFunctionFormat?.function_description
                updatedNewFunction.functionDepartment = tmpFunctionFormat?.function_department
                updatedNewFunction.addedDate = new Date().toISOString()
                updatedNewFunction.dueDate = new Date().toISOString()
                updatedNewFunction.lastEdited = new Date().toISOString()
                updatedNewFunction.taskId = task?.id

                const newFunctionFields = data.task_functions[0].function_fields.map((field) => {
                    const functionField = {
                        fieldTitle: field["ff_title"],
                        fieldDescription: field["ff_description"],
                        functionId: 0, // TO SET
                        fieldCreated: new Date().toISOString(),
                        lastEdited: new Date().toISOString(),
                        fieldColumns: []
                    }

                    const newFieldColumns = field.ff_columns.map(column => {
                        const fieldColumn = {
                            type: column?.type,
                            name: column?.name,
                            value: null,
                            forwardFileToEmail: null,
                            largeText: false,
                            unique: column?.unique,
                            autoAssign: column?.auto_assign,
                            multipleFiles: column?.multiple_files,
                            functionFieldId: 0, // TO SET
                            lastEdited: new Date().toISOString()
                        }

                        return fieldColumn;
                    });

                    functionField.fieldColumns = [...newFieldColumns]

                    return functionField;
                })

                updatedNewFunction.functionFields = newFunctionFields;

                console.log("in ue:", updatedNewFunction)

                setNewFunction(updatedNewFunction);

            }
        })();
    }, [task]);


    const handleAddFunction = async () => {
        let tmpNewFunction = { ...newFunction }
        console.log("in add function:", selectedUser);
        console.log("tmpNewFunction:", tmpNewFunction)
        const newFunctionFields = tmpNewFunction.functionFields.map((field) => {
            const newFieldColumns = field.fieldColumns.map(column => {
                const newColumn = { ...column }
                if (newColumn.autoAssign === null || newColumn.autoAssign === undefined) {
                    newColumn.autoAssign = false;
                }
                if (newColumn.largeText === null || newColumn.largeText === undefined) {
                    newColumn.largeText = false;
                }
                if (newColumn.multipleFiles === null || newColumn.multipleFiles === undefined) {
                    newColumn.multipleFiles = false;
                }
                if (newColumn.unique === null || newColumn.unique === undefined) {
                    newColumn.unique = false;
                }
                // ....
                return newColumn;
            })
            return { ...field, fieldColumns: [...newFieldColumns] }
        })

        tmpNewFunction.functionFields = [...newFunctionFields]

        console.log("updated tmpNewFunction:", tmpNewFunction)
        console.log("selectedUser: ", selectedUser);
        tmpNewFunction = {...tmpNewFunction, assignedUserId: selectedUser }
        
        tmpNewFunction.createdByUserId = user?.id;
        
        const formData = new FormData();
        formData.append('functionDto', JSON.stringify(tmpNewFunction));

        const fileDtos = [];
        tmpNewFunction.functionFields.forEach(field => {
            field.fieldColumns.forEach(column => {
                if (column.files && column.files.length > 0) {
                    column.files.forEach(file => {
                        formData.append('files', file);
                        fileDtos.push({
                            fieldColumnName: column.name,
                            functionFieldName: field.fieldTitle,
                            taskType: task?.taskType,
                            taskId: task?.id
                        });
                    });
                }
            });
        });

        formData.append('fileMetadata', JSON.stringify(fileDtos));
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

console.log("going to try catch:", tmpNewFunction, user);
        try {
            const { data } = await createFunction(formData);
            if (data) {
                fetchTask();
                setShowToast(true);
                setMessage("New function added!");
                dispatch(setFetchAgainStatus())
            }
        } catch (error) {
            console.error("Error adding function:", error);
        }
    };

    const handleChange = (event) => {
        const selectedFunctionTitle = event.target.value;
        const tmpFunctionFormat = functionFormat.task_functions.find(ele => ele.function_title === selectedFunctionTitle);
        console.log("Selected function format:", tmpFunctionFormat);
        setSelectedFunctionFormat(tmpFunctionFormat);

        // Set the initial values for `newFunction`
        const updatedNewFunction = { ...newFunction };
        updatedNewFunction.functionTitle = tmpFunctionFormat?.function_title;
        updatedNewFunction.functionDescription = tmpFunctionFormat?.function_description;
        updatedNewFunction.functionDepartment = tmpFunctionFormat?.function_department;
        updatedNewFunction.addedDate = new Date().toISOString();
        updatedNewFunction.dueDate = new Date().toISOString();
        updatedNewFunction.lastEdited = new Date().toISOString();
        updatedNewFunction.taskId = task?.id;
        updatedNewFunction.assignedUserId = selectedUser.id; // TO SET
        updatedNewFunction.createdByUserId = 3; // TO SET

        const newFunctionFields = tmpFunctionFormat.function_fields.map((field) => {
            const functionField = {
                fieldTitle: field["ff_title"],
                fieldDescription: field["ff_description"],
                functionId: 0, // TO SET
                fieldCreated: new Date().toISOString(),
                lastEdited: new Date().toISOString(),
                createdByUserId: 3,
                assignedUserId: 3,
                fieldColumns: field.ff_columns.map(column => ({
                    type: column?.type,
                    name: column?.name,
                    value: null,
                    files: [],
                    forwardFileToEmail: null,
                    largeText: false,
                    unique: column?.unique,
                    autoAssign: column?.auto_assign,
                    multipleFiles: column?.multiple_files,
                    functionFieldId: 0, // TO SET
                    lastEdited: new Date().toISOString()
                }))
            };
            return functionField;
        });

        if (tmpFunctionFormat?.choice !== true) {
            updatedNewFunction.functionFields = newFunctionFields;
        }
        else {
            updatedNewFunction["choice"] = true;
            updatedNewFunction.functionFields = [newFunctionFields[0]];
        }

        console.log("Updated new function:", updatedNewFunction);

        setNewFunction(updatedNewFunction);
    };

    const handleDueDate = (e) => {
        const updatedFunction = {...newFunction}
        updatedFunction.dueDate = e.target.value;

        setNewFunction(updatedFunction);
    }

    const handleFunctionChange = (e, fieldIndex, fieldColumnIndex) => {
        let { name, value, type, files, checked } = e.target;

        console.log(fieldIndex, fieldColumnIndex, name, value);

        console.log("before updating:", newFunction)
        const updatedFunction = { ...newFunction }

        if (fieldIndex === undefined) { // Handle function_field changes
            const newFunctionFields = updatedFunction?.functionFields.map((field, index) => {
                if (index === fieldIndex) {
                    if (type === 'file') {
                        const newField = { ...field, files }
                        console.log("\n\nupdated field:", newField);
                        return newField;
                    }
                    else {
                        const newField = { ...field, value }
                        console.log("\n\nupdated field:", newField);
                        return newField
                    }

                }
                return field;
            })

            updatedFunction.functionFields = [...newFunctionFields]
        }
        else { // Handle field_column changes
            const newFieldColumns = updatedFunction?.functionFields[fieldIndex].fieldColumns.map((column, index) => {
                if (index === fieldColumnIndex) {
                    if (type == 'file') {
                        const newFieldColumn = { ...column, files: [] }
                        for (let i = 0; i < files.length; i++) {
                            newFieldColumn.files.push(files[i]);
                        }

                        return newFieldColumn;
                    }
                    else {
                        if (column.type === 'BOOLEAN') {
                            return { ...column, value: `${checked}`}
                        }
                        return { ...column, [name]: value }
                    }
                }
                return column;
            })

            updatedFunction.functionFields[fieldIndex].fieldColumns = [...newFieldColumns]
        }

        console.log("handle func change:", updatedFunction)

        setNewFunction(updatedFunction);
    }

    const getCustomer = async () => {
        const { data, error } = await fetchCustomerById(customerId);
        return { data, error }
    };

    return (
        <div className="pb-3 border-bottom d-flex align-items-center gap-2">
            <h3>Functions</h3>
            {!task?.isCompleted &&
                <Button
                    variant='info'
                    handleClick={() => setShowAddFunctionModal(true)}
                >Add</Button>
            }
            <MyModal
                show={showAddFunctionModal}
                onHide={() => setShowAddFunctionModal(false)}
                modalHeading="Add Function"
                showModalFooter={true}
                showBackBtn={false}
                handleContinue={() => {
                    setShowAddFunctionModal(false)
                    setShowAssignTaskModal(false)
                    setShowAddFunctionFieldModal(true)
                }}
            >
                <SelectFunction
                    functionFormat={functionFormat}
                    selectedFunctionFormat={selectedFunctionFormat}
                    handleChange={handleChange}
                />
            </MyModal>
            <MyModal
                show={showAddFunctionFieldModal}
                onHide={() => setShowAddFunctionFieldModal(false)}
                modalHeading={`Function: ${selectedFunctionFormat?.function_title}`}
                showModalFooter={true}
                showBackBtn={true}
                handleBack={() => {
                    setShowAddFunctionFieldModal(false)
                    setShowAssignTaskModal(false)
                    setShowAddFunctionModal(true)
                }}
                handleContinue={() => {
                    setShowAddFunctionModal(false)
                    setShowAddFunctionFieldModal(false)
                    setShowAssignTaskModal(true)
                }}
            >
                <InputFunctionField
                    selectedFunctionFormat={selectedFunctionFormat}
                    newFunction={newFunction}
                    handleFunctionChange={handleFunctionChange}
                    setNewFunction={setNewFunction}
                    handleDueDate={handleDueDate}
                />
            </MyModal>
            <MyModal
                show={showAssignTaskModal}
                onHide={() => {
                    setShowAddFunctionFieldModal(false)
                    setShowAssignTaskModal(false)
                }}
                modalHeading="Assign Task"
                showModalFooter={true}
                showBackBtn={true}
                handleBack={() => {
                    setShowAssignTaskModal(false)
                    setShowAddFunctionFieldModal(true)
                    setShowAddFunctionModal(false)
                }}
                handleContinue={() => {
                    console.log("add function!")
                    setShowAssignTaskModal(false)
                    setShowAddFunctionFieldModal(false)
                    setShowAddFunctionModal(false)
                    handleAddFunction()

                }}
            >
                <AssignTask
                    task={task}
                    newFunction={newFunction}
                    selectedFunctionFormat={selectedFunctionFormat}
                    allUsers={allUsers}
                    usersArr={usersArr}
                    setUsersArr={setUsersArr}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </MyModal>
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

export default AddFunction