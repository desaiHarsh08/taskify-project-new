import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TaskDetails from '../components/task/TaskDetails'
import FunctionList from '../components/task/FunctionList';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../apis/taskApis';
import AddFunction from './AddFunction';
import { useSelector } from 'react-redux';
import { selectFetchAgainStatus } from '../app/features/fetchAgainSlice';

const Task = () => {
    const { taskId } = useParams();

    const [task, setTask] = useState();

    const fetchAgainStatus = useSelector(selectFetchAgainStatus);

    useEffect(() => {
        fetchTask();
    }, [fetchAgainStatus]);

    const fetchTask = async () => {
        const { data, error } = await fetchTaskById(taskId);
        console.log("task:", data)
        setTask(data);
    }

    return (
        <Container fluid className='p-0 h-100'>
            <Row id='task-container' className='m-0 h-100'>
                {window.innerWidth < 575 && <Col className='p-0 col-12 col-sm-4 overflow-auto h-100'>
                    <TaskDetails task={task} setTask={setTask} />
                </Col>}
                <Col className='p-2 col-12 col-sm-8 h-100 overflow-auto'>
                    <AddFunction task={task} fetchTask={fetchTask} />
                    <FunctionList task={task} />
                </Col>
                {window.innerWidth > 575 && <Col className='p-0 col-12 col-sm-4 overflow-auto h-100'>
                    <TaskDetails task={task} setTask={setTask} />
                </Col>}
            </Row>
        </Container>
    )
}

export default Task