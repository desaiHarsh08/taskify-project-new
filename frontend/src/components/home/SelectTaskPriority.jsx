import { Form } from "react-bootstrap";

const SelectTaskPriority = ({ setTaskPriority }) => {
    return (
        <div
            className="modal fade"
            id="inputTaskPriorityModal"
            aria-hidden="true"
            aria-labelledby="inputTaskPriorityModalLabel2"
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
                            Task Priority
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-3">Select the task priority</p>
                        <Form.Select
                            size="sm"
                            className="my-4"
                            onChange={(e) => setTaskPriority(e.target.value)}
                        >
                            <option value="NORMAL">NORMAL</option>
                            <option value="INTERMEDIATE">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </Form.Select>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-target="#inputTaskTypeModal"
                            data-bs-toggle="modal"
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-target="#customerInfoModal"
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

export default SelectTaskPriority;
