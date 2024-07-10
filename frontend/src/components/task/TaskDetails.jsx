import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { fetchAllUsers, updateUser } from "../../apis/authApis";
import TaskInfo from "./TaskInfo";
import TaskActions from "./TaskActions";
import CustomerInfo from "./CustomerInfo";
import { fetchCustomerById, updateCustomer } from "../../apis/customerApis";

const TaskDetails = ({ task, setTask, taskIdFormat }) => {
    const [customer, setCustomer] = useState();
    const [allUsers, setAllUsers] = useState([]);

    

    useEffect(() => {
        
    }, [taskIdFormat]);

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchAllUsers();
            if (data) {
                setAllUsers(data);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (task) {
                const { data, error } = await fetchCustomerById(
                    task?.customerId
                );
                console.log("customer info:", data);
                if (data) {
                    setCustomer(data);
                }
            }
        })();
    }, [task]);

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        // console.log()
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    const handleSave = async () => {
        const { data, error } = await updateCustomer(customer);
        console.log(data);
        if (data) {
            setCustomer(data);
        }
    };

    return (
        <div className="h-100 p-3 border overflow-hidden">
            <div className="border-bottom pb-3">
                <h3>TASK #{taskIdFormat}</h3>
                <div className="d-flex gap-2">
                    <p>Priority:</p>
                    <p
                        className="rounded px-2 py-1"
                        style={{
                            backgroundColor:
                                task?.taskPriority == "NORMAL"
                                    ? "#6da8ff"
                                    : task?.taskPriority == "HIGH"
                                    ? "#ff5757"
                                    : "grey",
                            color: "white",
                            fontSize: "12px",
                        }}
                    >
                        {task?.taskPriority}
                    </p>
                </div>
            </div>
            <div className="h-100 overflow-auto pb-5">
                <TaskInfo allUsers={allUsers} task={task} />
                <Tabs
                    defaultActiveKey="actions"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="actions" title="Actions">
                        <TaskActions
                            task={task}
                            setTask={setTask}
                            allUsers={allUsers}
                        />
                    </Tab>
                    <Tab
                        eventKey="customer"
                        title="Customer Info"
                        className="p-0"
                    >
                        <CustomerInfo
                            customer={customer}
                            setCustomer={setCustomer}
                            handleCustomerChange={handleCustomerChange}
                            handleSave={handleSave}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default TaskDetails;
