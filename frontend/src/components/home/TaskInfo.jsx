import React, { useEffect } from 'react'

const TaskInfo = ({ selectedTaskType, taskArr, taskInfo, setTaskInfo }) => {
    useEffect(() => { }, [selectedTaskType]);

    const handleTaskInfoChange = (e) => {
        const { name, value } = e.target;

        setTaskInfo(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="modal fade" id="taskInfoDetailsModal" aria-hidden="true" aria-labelledby="taskInfoDetailsModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 d-flex align-items-center gap-2" id="taskInfoDetailsModalToggleLabel2">
                            <p>Task Info: </p>
                            <p className='bg-body-secondary fs-6 p-1 rounded px-2'>{selectedTaskType}</p>
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='d-flex flex-column gap-2'>
                            <div class="form-group">
                                <label for="pumpType">Pump Type</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="pumpType"
                                    value={taskInfo.pumpType}
                                    onChange={handleTaskInfoChange}
                                    name='pumpType'
                                />
                            </div>
                            {selectedTaskType.toUpperCase() === "NEW_PUMP_INQUIRY" ?
                                <>
                                    <div class="form-group">
                                        <label for="pumpManufacturer">Pump Manufaturer</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={taskInfo.pumpManufacturer}
                                            onChange={handleTaskInfoChange}
                                            name='pumpManufacturer'
                                            id="pumpManufacturer"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="specification">Specification</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={taskInfo.specification}
                                            onChange={handleTaskInfoChange}
                                            name='specification'
                                            id="specification"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="requirements">Requirements</label>
                                        <textarea
                                            class="form-control"
                                            id="problemDescription"
                                            value={taskInfo.requirements}
                                            onChange={handleTaskInfoChange}
                                            name='requirements'
                                        />
                                    </div>
                                </>
                                :
                                <div class="form-group">
                                    <label for="problemDescription">Problem being faced</label>
                                    <textarea
                                        class="form-control"
                                        id="problemDescription"
                                        value={taskInfo.problemDescription}
                                        onChange={handleTaskInfoChange}
                                        name='problemDescription'
                                    />
                                </div>

                            }
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-target="#customerInfoModal"
                            data-bs-toggle="modal"
                        >Back</button>
                        <button
                            className="btn btn-primary"
                            data-bs-target="#assignTaskModal"
                            data-bs-toggle="modal"
                        >Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskInfo