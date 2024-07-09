import React, { useEffect, useState } from "react";
import { Badge, Container, Form } from "react-bootstrap";
import { fetchAllUsers } from "../../apis/authApis";
import { fetchCustomerById } from "../../apis/customerApis";

const AssignTask = ({ task, allUsers, selectedUser, setSelectedUser }) => {
    const [usersArr, setUsersArr] = useState(allUsers);

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
        <div>
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
                    <label htmlFor="" className="fw-bolder m-0 p-0"></label>
                    <Container
                        fluid
                        className="p-0 my-3  overflow-auto"
                        style={{ height: "350px" }}
                    >
                        {console.log(usersArr)}
                        {usersArr.map((user, index) => (
                            <div
                                key={`user-${index}`}
                                className={`d-flex gap-4 ${
                                    selectedUser === user.id ? "bg-light" : ""
                                } align-items-center p-2 border-bottom`}
                            >
                                <input
                                    type="radio"
                                    name="assignee"
                                    id={`assignee-${user.id}`}
                                    value={user.id}
                                    checked={selectedUser === user.id}
                                    onChange={() => {
                                        console.log("select user: ", user);
                                        setSelectedUser(user.id);
                                    }}
                                />
                                <div>
                                    <div className="d-flex gap-2">
                                        <p>{user?.name}</p>
                                        <Badge
                                            bg={`${
                                                user.isAdmin
                                                    ? "info"
                                                    : "secondary"
                                            }`}
                                        >
                                            {user.isAdmin
                                                ? "ADMIN"
                                                : user.department}
                                        </Badge>
                                    </div>
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        ))}
                    </Container>
                </div>
            </form>
        </div>
    );
};

export default AssignTask;
