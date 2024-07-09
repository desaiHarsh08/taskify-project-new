import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const TaskInfo = ({ selectedTaskType, taskInfo, setTaskInfo }) => {
    useEffect(() => {}, [selectedTaskType]);

    const handleTaskInfoChange = (e) => {
        const { name, value } = e.target;

        setTaskInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="modal fade"
            id="taskInfoDetailsModal"
            aria-hidden="true"
            aria-labelledby="taskInfoDetailsModal"
            tabIndex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5 d-flex align-items-center gap-2"
                            id="taskInfoDetailsModalToggleLabel2"
                        >
                            <p>Task Info: </p>
                            <p className="bg-body-secondary fs-6 p-1 rounded px-2">
                                {selectedTaskType}
                            </p>
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="d-flex flex-column gap-2">
                            <div className="form-group">
                                <label htmlFor="pumpType">Pump Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pumpType"
                                    // eslint-disable-next-line react/prop-types
                                    value={taskInfo.pumpType}
                                    onChange={handleTaskInfoChange}
                                    name="pumpType"
                                />
                            </div>
                            {/* eslint-disable-next-line react/prop-types */}
                            {selectedTaskType.toUpperCase() ===
                            "NEW_PUMP_INQUIRY" ? (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="pumpManufacturer">
                                            Pump Manufaturer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // eslint-disable-next-line react/prop-types
                                            value={taskInfo.pumpManufacturer}
                                            onChange={handleTaskInfoChange}
                                            name="pumpManufacturer"
                                            id="pumpManufacturer"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="specification">
                                            Specification
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // eslint-disable-next-line react/prop-types
                                            value={taskInfo.specification}
                                            onChange={handleTaskInfoChange}
                                            name="specification"
                                            id="specification"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="requirements">
                                            Requirements
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="problemDescription"
                                            // eslint-disable-next-line react/prop-types
                                            value={taskInfo.requirements}
                                            onChange={handleTaskInfoChange}
                                            name="requirements"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="form-group">
                                    <label htmlFor="problemDescription">
                                        Problem being faced
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="problemDescription"
                                        // eslint-disable-next-line react/prop-types
                                        value={taskInfo.problemDescription}
                                        onChange={handleTaskInfoChange}
                                        name="problemDescription"
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-target="#customerInfoModal"
                            data-bs-toggle="modal"
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-target="#assignTaskModal"
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

export default TaskInfo;
