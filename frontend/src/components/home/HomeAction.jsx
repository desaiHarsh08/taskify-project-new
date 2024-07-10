import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdAddToPhotos } from "react-icons/md";
import Button from "../ui/Button";
import { IoIosPeople } from "react-icons/io";
import { SiTask } from "react-icons/si";
import MetadataStat from "./MetadataStat";
import MyModal from "../ui/MyModal";
import SelectTaskType from "./SelectTaskType";
import SelectTaskPriority from "./SelectTaskPriority";
import AddCustomerDetails from "./AddCustomerDetails";
import TaskInfo from "./TaskInfo";
import AssignTask from "./AssignTask";
import { getStats } from "../../apis/taskApis";
import MyToast from "../ui/MyToast";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { useUser } from "../../hooks/useUser";

const HomeAction = () => {
    const user = useUser();
    console.log(user)

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [taskPriority, setTaskPriority] = useState("NORMAL");
    const [selectedTaskType, setSelectedTaskType] =
        useState("NEW_PUMP_INQUIRY");

    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        customerTmpId: "",
        email: "",
        personOfContact: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });
    const [taskInfo, setTaskInfo] = useState({
        pumpType: "",
        pumpManufacturer: "",
        specification: "",
        problemDescription: "",
        customerModel: customerInfo,
        requirements: "",
        createdByUserId: user?.id,
    });

    return (
        <Row className="m-0 gap-3">
            <Col className="p-0 ">
                <div className="card" style={{ minHeight: "170px" }}>
                    <div className="card-header">Task Action</div>
                    <div className="card-body">
                        <h5 className="card-title d-flex align-items-center gap-2 fs-4">
                            <MdAddToPhotos />
                            <p>New Task</p>
                        </h5>
                        <p className="card-text mb-3">Create a new task</p>
                        <button
                            className="btn btn-primary"
                            data-bs-target="#inputTaskTypeModal"
                            data-bs-toggle="modal"
                        >
                            Create Task
                        </button>
                        <SelectTaskType
                            setSelectedTaskType={setSelectedTaskType}
                        />
                        <SelectTaskPriority
                            setTaskPriority={setTaskPriority}
                        />
                        <AddCustomerDetails
                            customerInfo={customerInfo}
                            setCustomerInfo={setCustomerInfo}
                        />
                        <TaskInfo
                        taskInfo={taskInfo}
                            selectedTaskType={selectedTaskType}
                            setTaskInfo={setTaskInfo}
                        />
                        <AssignTask
                            selectedTaskType={selectedTaskType}
                            taskPriority={taskPriority}
                            customerInfo={customerInfo}
                            taskInfo={taskInfo}
                            setShowToast={setShowToast}
                            setMessage={setMessage}
                        />
                    </div>
                </div>
            </Col>
            <MetadataStat />

            {showToast && (
                <MyToast
                    show={showToast}
                    message={message}
                    onClose={() => setShowToast(false)}
                />
            )}
        </Row>
    );
};

export default HomeAction;
