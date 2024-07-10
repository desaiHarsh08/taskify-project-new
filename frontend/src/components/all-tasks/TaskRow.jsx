import Button from "../ui/Button";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../utils/helper";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const TaskRow = ({ task, index }) => {
    const navigate = useNavigate();

    const [taskId, setTaskId] = useState("");

    useEffect(() => {
        const date = new Date(task?.createdDate);
        let tmpTaskId = "";
        if (task?.taskType == "SERVICE_TASK") {
            tmpTaskId = "S";
        }
        else {
            tmpTaskId = "N";
        }
        tmpTaskId += `${date.getFullYear().toString().substring(2)}${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, 0)}${(task?.id).toString().padStart(3, 0)}`;

        setTaskId(tmpTaskId);
    }, []);

    const handleTaskView = (taskId = 1) => {
        navigate(`${taskId}`, { replace: true });
    };

    return (
        <tr>
            <td className="pt-3 text-center">{index + 1}.</td>
            <td className="pt-3 text-center">#{taskId}</td>
            <td className="pt-3 text-center">{task?.taskType}</td>
            <td className="pt-3 text-center">
                <p
                    className="rounded"
                    style={{
                        backgroundColor:
                            task?.taskPriority == "NORMAL"
                                ? "#6da8ff"
                                : task?.taskPriority == "HIGH"
                                ? "#ff5757"
                                : "grey",
                        color: "white",
                    }}
                >
                    {task?.taskPriority}
                </p>
            </td>
            <td className="pt-3 text-center">
                {getFormattedDate(task?.createdDate)}
            </td>
            <td className="pt-3 text-center">
                <Badge
                    bg={`${
                        task?.isCompleted ? "success" : "warning text-dark"
                    }`}
                >
                    {task?.isCompleted ? "CLOSED" : "IN_PROGRESS"}
                </Badge>
            </td>
            <td className="pt-3 text-center">-</td>
            <td className="d-flex justify-content-center">
                <Button
                    size="btn-sm"
                    handleClick={() => handleTaskView(task?.id)}
                >
                    View
                </Button>
            </td>
        </tr>
    );
};

export default TaskRow;
