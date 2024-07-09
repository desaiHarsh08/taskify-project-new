import { useEffect, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { fetchAllUsers } from "../../apis/authApis";
import { addCustomer } from "../../apis/customerApis";
import { createTask } from "../../apis/taskApis";
import { useUser } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { setFetchAgainStatus } from "../../app/features/fetchAgainSlice";
import { setLoadingState } from "../../app/features/loadingSlice";

const getAllUsers = async () => {
    const { data, error } = await fetchAllUsers();
    console.log(data);
    return { data, error };
};

const AssignTask = ({
    // eslint-disable-next-line react/prop-types
    selectedTaskType,
    // eslint-disable-next-line react/prop-types
    taskPriority,
    // eslint-disable-next-line react/prop-types
    customerInfo,
    // eslint-disable-next-line react/prop-types
    taskInfo,
    // eslint-disable-next-line react/prop-types
    setShowToast,
    // eslint-disable-next-line react/prop-types
    setMessage,
}) => {
    const dispatch = useDispatch();

    const user = useUser();
    console.log(user);
    const [allUsers, setAllUsers] = useState([]);
    const [usersArr, setUsersArr] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

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
        console.log("selectedUser:", selectedUser);
    }, [selectedUser]);

    useEffect(() => {}, [
        selectedTaskType,
        taskPriority,
        customerInfo,
        taskInfo,
    ]);

    const handleCreateTask = async () => {
        console.log("saving customerInfo:", customerInfo);
        dispatch(setLoadingState(true));
        const { data: customerResponse } = await addCustomer(customerInfo);
        if (customerResponse) {
            const customerId = customerResponse.id;
            // Create the new task
            const newTask = {
                taskType: selectedTaskType,
                customerId,
                taskPriority,
                ...taskInfo,
                assignedUserId: selectedUser,
                createdDate: new Date(),
            };
            newTask.createdByUserId = user?.id;

            console.log("saving newTask:", newTask);
            const { data: taskResponse } = await createTask(newTask);
            console.log(taskResponse);

            setShowToast(true);
            setMessage("New task created!");

            dispatch(setFetchAgainStatus());
        }
        dispatch(setLoadingState(false));
    };

    const handleSearch = (e) => {
        const searctTxt = e.target.value.toLowerCase();
        let newUsersArr = [];
        if (usersArr.length > 1) {
            newUsersArr = usersArr.filter((user) => {
                if (
                    user.name.toLowerCase().includes(searctTxt) ||
                    user.email.toLowerCase().includes(searctTxt) ||
                    user.department.toLowerCase().includes(searctTxt)
                ) {
                    return user;
                }
            });
            setUsersArr(newUsersArr);
        } else {
            setUsersArr(allUsers);
        }
    };

    return (
        <div
            className="modal  fade"
            id="assignTaskModal"
            aria-hidden="true"
            aria-labelledby="assignTaskModal"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="exampleModalToggleLabel2"
                        >
                            Assign Task
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body " style={{ height: "450px" }}>
                        <form>
                            <div>
                                <input
                                    className="form-control"
                                    placeholder="type here for searching..."
                                    type="text"
                                    name="searchUser"
                                    id="searchUser"
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="assign-user">
                                <label
                                    htmlFor=""
                                    className="fw-bolder m-0 p-0"
                                ></label>
                                <Container
                                    fluid
                                    className="p-0 my-3  overflow-auto"
                                    style={{ height: "350px" }}
                                >
                                    {console.log(usersArr)}
                                    {usersArr.map((myUser, index) => (
                                        <div
                                            className={`
                                                d-flex gap-4 ${
                                                    selectedUser === myUser.id
                                                        ? "bg-light"
                                                        : ""
                                                } align-items-center p-2 border-bottom
                                            `}
                                            key={`assign-user-${index}`}
                                        >
                                            <input
                                                type="radio"
                                                name="assignee"
                                                id={`assignee-${myUser.id}`}
                                                value={myUser.id}
                                                checked={
                                                    selectedUser === myUser.id
                                                }
                                                onChange={() =>
                                                    setSelectedUser(myUser.id)
                                                }
                                            />
                                            <div>
                                                <div className="d-flex gap-2">
                                                    <p>{myUser?.name}</p>
                                                    <Badge
                                                        bg={`${
                                                            myUser.isAdmin
                                                                ? "info"
                                                                : "secondary"
                                                        }`}
                                                    >
                                                        {myUser.isAdmin
                                                            ? "ADMIN"
                                                            : myUser.department}
                                                    </Badge>
                                                </div>
                                                <p>{myUser?.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Container>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-target="#taskInfoDetailsModal"
                            data-bs-toggle="modal"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleCreateTask}
                            className="btn btn-primary"
                            data-bs-target="#assignTaskModal"
                            data-bs-toggle="modal"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;
