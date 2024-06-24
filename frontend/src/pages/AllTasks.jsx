import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from '../components/ui/Button';
import { Badge, Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Pagination from 'react-bootstrap/Pagination';
import TaskRow from '../components/all-tasks/TaskRow';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const AllTasks = () => {
    const { pathname } = useLocation();

    const { taskId, functionId } = useParams();

    return (
        <Container fluid className=' h-100'>
            <Breadcrumb>
                <Breadcrumb.Item
                    as={Link}
                    to="/home"
                    active={
                        pathname.toLowerCase().endsWith("/home") || pathname.toLowerCase().endsWith("/home/") ? true : false
                    }
                >Home</Breadcrumb.Item>
                <Breadcrumb.Item
                    active={
                        pathname.toLowerCase().endsWith("tasks") || pathname.toLowerCase().endsWith("tasks/") ? true : false
                    }
                >
                    <Link to="/home/tasks">All Tasks</Link>
                    </Breadcrumb.Item>
                {taskId &&
                    <Breadcrumb.Item
                        active={
                            pathname.toLowerCase().endsWith(`/home/tasks/${taskId}`) || pathname.toLowerCase().endsWith(`/home/tasks/${taskId}/`) ? true : false
                        }
                    >
                        <Link to={`/home/tasks/${taskId}`}>Task #{taskId}</Link>
                    </Breadcrumb.Item>
                }
                {functionId &&
                    <Breadcrumb.Item
                        active={
                            pathname.toLowerCase().endsWith(`/home/tasks/${taskId}/${functionId}`) || pathname.toLowerCase().endsWith(`/home/tasks/${taskId}/${functionId}/`) ? true : false
                        }
                    >
                        <Link to={`/home/tasks/${taskId}/${functionId}`}>Function #{functionId}</Link>
                    </Breadcrumb.Item>
                }
            </Breadcrumb>
            <div className='overflow-x-auto' style={{ height: "95%" }}>
                <Outlet />
            </div>
        </Container>
    )
}

export default AllTasks