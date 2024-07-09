import React, { useEffect, useState } from "react";
import { Accordion, Alert, Badge, Container, Table } from "react-bootstrap";
import Button from "../components/ui/Button";
import Form from "react-bootstrap/Form";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import FieldRow from "../components/function-view/FieldRow";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../apis/taskApis";
import MyToast from "../components/ui/MyToast";
import { updateFunctionField } from "../apis/functionFieldApis";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFetchAgainStatus,
    setFetchAgainStatus,
} from "../app/features/fetchAgainSlice";
import AlertDialog from "../components/ui/AlertDialog";
import { fetchFunctionFormat, updateFunction } from "../apis/functionApis";
import MyModal from "../components/ui/MyModal";
import InputFunctionField from "../components/task/InputFunctionField";
import { setLoadingState } from "../app/features/loadingSlice";
import { createFieldColumn } from "../apis/fieldColumnApis";

const FunctionView = () => {
    const { taskId, functionId } = useParams();

    const dispatch = useDispatch();

    const fetchAgainStatus = useSelector(selectFetchAgainStatus);

    const [task, setTask] = useState();
    const [showAddFunctionFieldModal, setShowAddFunctionFieldModal] =
        useState(false);
    const [selectedFunctionFormat, setSelectedFunctionFormat] = useState();
    const [newFunction, setNewFunction] = useState();
    const [taskFunction, setTaskFunction] = useState();
    const [showToast, setShowToast] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const [message, setMessage] = useState("");
    const [canMarkFunction, setCanMarkFunction] = useState(false);
    const [choiceFnTemplate, setChoiceFnTemplate] = useState();

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchTaskById(taskId);
            console.log(data);
            if (data) {
                // Set the task
                setTask(data);
                // Set the function
                const myFunction = data?.functions?.find(
                    (func) => func?.id == functionId
                );
                setTaskFunction(myFunction);
                const tmp = myFunction.functionFields.filter(
                    (field) => field.isCompleted != true
                );
                if (tmp.length > 0) {
                    setCanMarkFunction(false);
                } else {
                    setCanMarkFunction(true);
                }

                const { data: fnTemplate, error: fnError } =
                    await fetchFunctionFormat(data?.taskType);
                console.log("func formats:", fnTemplate);

                const tmpSelectedFnFormat = fnTemplate?.task_functions.find(
                    (fn) =>
                        myFunction?.functionTitle == fn?.function_title &&
                        myFunction?.function_description ==
                            fn?.functionDescription
                );

                setSelectedFunctionFormat(tmpSelectedFnFormat);

                console.log("tmpSelectedFnFormat:", tmpSelectedFnFormat);

                const choiceFn = fnTemplate?.task_functions.find(
                    (fn) => fn?.choice == true
                );
                console.log("myFunction:", myFunction);
                console.log("choiceFn:", choiceFn);
                if (
                    choiceFn &&
                    myFunction?.isCompleted != true &&
                    myFunction?.functionTitle == choiceFn?.function_title &&
                    myFunction?.function_description ==
                        choiceFn?.functionDescription
                ) {
                    setChoiceFnTemplate(choiceFn);
                }
            }
        })();
    }, [fetchAgainStatus]);

    const handleFunctionChange = (e, fieldIndex, fieldColumnIndex) => {
        const { name, value, checked, type } = e.target;
        console.log(name, type, value, checked, fieldIndex, fieldColumnIndex);

        let tmpNewFunction = { ...newFunction };
        console.log("before updating, tmpNewFunction:", tmpNewFunction);

        let tmpNewField = { ...newFunction.functionFields[0] };
        console.log("tmpNewField:", tmpNewField);

        const newColumns = tmpNewField?.fieldColumns.map((fieldColumn, idx) => {
            if (idx === fieldColumnIndex) {
                const newFieldColumn = {
                    ...fieldColumn,
                    value: type === "checkbox" ? `${checked}` : value,
                };
                console.log(
                    "updating column: ",
                    type === "checkbox" ? checked : value,
                    newFieldColumn
                );
                return newFieldColumn;
            }
            return fieldColumn;
        });

        // tmpNewField = {...tmpNewField, fieldColumns: newColumns};
        tmpNewFunction.functionFields = [
            { ...tmpNewField, fieldColumns: newColumns },
        ];

        console.log("after updating:", tmpNewFunction);

        setNewFunction(tmpNewFunction);

        // const newFunctionFields = taskFunction?.functionFields?.map(
        //     (functionField, index) => {
        //         if (index === fieldIndex) {
        //             const newFieldColumns = functionField.fieldColumns.map(
        //                 (fieldColumn, idx) => {
        //                     if (idx === fieldColumnIndex) {
        //                         const newFieldColumn = {
        //                             ...fieldColumn,
        //                             [name]: value,
        //                         };
        //                         return newFieldColumn;
        //                     }
        //                     return fieldColumn;
        //                 }
        //             );
        //             return {
        //                 ...functionField,
        //                 fieldColumns: [...newFieldColumns],
        //             };
        //         }
        //         return functionField;
        //     }
        // );

        // console.log("updated values:", {
        //     ...taskFunction,
        //     functionFields: newFunctionFields,
        // });
        // setTaskFunction({
        //     ...taskFunction,
        //     functionFields: [...newFunctionFields],
        // });
    };

    const handleDueDate = () => {};

    const handleSaveFunctionField = async (field, action) => {
        dispatch(setLoadingState(true));
        const { data, error } = await updateFunctionField(field);
        dispatch(setLoadingState(false));
        setShowToast(true);
        setMessage("Field Updated!");
        if (data) {
            setShowToast(true);
            setMessage(`Field ${action}!`);
            dispatch(setFetchAgainStatus());
        }
    };

    const handleDoneFunction = async () => {
        const newTaskFunction = { ...taskFunction };
        console.log("in done func:", newTaskFunction);
        // Check whether all fields are complete
        const notCompletedArr = newTaskFunction.functionFields.filter(
            (field) => field.isCompleted != true
        );
        if (notCompletedArr.length > 0) {
            return;
        }

        newTaskFunction.isCompleted = true;
        console.log("newTaskFunction:", newTaskFunction);

        dispatch(setLoadingState(true));
        const { data, error } = await updateFunction(newTaskFunction);
        if (data) {
            console.log("done function:", data);
            setTaskFunction(newTaskFunction);
            setShowToast(true);
            setMessage("Function Done!");
        }
        dispatch(setLoadingState(false));
    };

    const handleAddFunctionField = async () => {
        // setShowAddFunctionFieldModal(false);
        const tmpNewField = { ...newFunction.functionFields[0] };
        tmpNewField.functionId = taskFunction?.id;
        const template = selectedFunctionFormat?.function_fields?.find(
            (ff) =>
                ff?.ff_title == tmpNewField?.fieldTitle &&
                ff?.ff_description == tmpNewField?.fieldDescription
        );
        console.log("format:", selectedFunctionFormat, template);

        for (let i = 0; i < template?.ff_columns?.length; i++) {
            if (
                tmpNewField.fieldColumns[i].name == template?.ff_columns[i].name
            ) {
                tmpNewField.fieldColumns[i].autoAssign =
                    template?.ff_columns[i]?.auto_assign || false;
                tmpNewField.fieldColumns[i].forwardFileToEmail =
                    template?.ff_columns[i]?.forward_file || false;
                tmpNewField.fieldColumns[i].multipleFiles =
                    template?.ff_columns[i]?.multiple_files || false;
                tmpNewField.fieldColumns[i].unique =
                    template?.ff_columns[i]?.unique || false;
            }
        }

        console.log("adding field, newFunction:", tmpNewField);

        const { data, error } = await createFieldColumn(tmpNewField);
        console.log(data);
        // if (data) {
        // }
    };

    return (
        <Container fluid className="p-0 bor der bord er-danger h-h-auto">
            <div className="border-bottom pb-3">
                <h2 className="d-flex gap-3 align-items-center">
                    <p>Function: </p>
                    <p className="bg-body-secondary p-1 px-2 rounded">
                        {taskFunction?.functionTitle}
                    </p>
                </h2>
                <Badge className="mb-2">
                    {taskFunction?.functionDepartment}
                </Badge>
                <br />
                {!taskFunction?.isCompleted && (
                    <div className="mr-2 mt-3 d-flex align-items-center gap-2">
                        <Button
                            handleClick={() => setShowDone(true)}
                            size="btn-sm"
                            variant={`${
                                taskFunction?.isCompleted
                                    ? "success"
                                    : "secondary"
                            }`}
                            disabled={!canMarkFunction}
                        >
                            Done
                        </Button>
                        <AlertDialog
                            show={showDone}
                            onHide={() => setShowDone(false)}
                            alertHeading="Done?"
                            message="Mark the function as done!"
                            handleContinue={handleDoneFunction}
                        />

                        {/* <Button
                            handleClick={() => setShowDE(true)}
                            size='btn-sm'
                            variant={`danger`}
                            disabled={taskFunction?.isCompleted}
                        >Delete</Button> */}
                    </div>
                )}
            </div>
            <div className="my-2">
                <h5 className="m-0 p-0">Description</h5>
                <p className="">{taskFunction?.functionDescription}</p>
            </div>
            <div className="d-flex gap-3 p-2 my-3">
                {choiceFnTemplate && (
                    <>
                        <Button
                            handleClick={() =>
                                setShowAddFunctionFieldModal(true)
                            }
                        >
                            Add
                        </Button>
                        <MyModal
                            show={showAddFunctionFieldModal}
                            onHide={() => setShowAddFunctionFieldModal(false)}
                            modalHeading={`Function: ${selectedFunctionFormat?.function_title}`}
                            showModalFooter={true}
                            showBackBtn={false}
                            handleContinue={handleAddFunctionField}
                        >
                            <InputFunctionField
                                selectedFunctionFormat={selectedFunctionFormat}
                                newFunction={newFunction}
                                handleFunctionChange={handleFunctionChange}
                                setNewFunction={setNewFunction}
                                handleDueDate={handleDueDate}
                            />
                        </MyModal>
                    </>
                )}
            </div>
            <div style={{ overflow: "auto" }}>
                <Table bordered style={{ minWidth: "1245px" }}>
                    <thead>
                        <tr className="text-center">
                            <th className="bg-body-secondary">Sr. No.</th>
                            <th className="bg-body-secondary">Title</th>
                            <th className="bg-body-secondary">Description</th>
                            <th className="bg-body-secondary">Created At</th>
                            <th className="bg-body-secondary">Last Edited</th>
                            <th className="bg-body-secondary">Status</th>
                            <th className="bg-body-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskFunction?.functionFields?.map((field, index) => (
                            <FieldRow
                                key={`field-row-${index}`}
                                field={field}
                                index={index}
                                taskFunction={taskFunction}
                                handleFunctionChange={handleFunctionChange}
                                handleSaveFunctionField={
                                    handleSaveFunctionField
                                }
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <MyToast
                show={showToast}
                message={message}
                onClose={() => setShowToast(false)}
            />
        </Container>
    );
};

export default FunctionView;
