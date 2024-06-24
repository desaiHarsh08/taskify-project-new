import React, { useEffect, useState } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import UserList from '../components/settings/UserList'
import { fetchAllUsers } from '../apis/authApis'

const Settings = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: usersResponse, error: usersError } = await fetchAllUsers();
            if (usersResponse) {
                setAllUsers(usersResponse);
            }
        })();
    }, [])

    return (
        <Container fluid className=' h-100 '>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    All Tasks
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Task</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ height: "95%" }}>
                <UserList allUsers={allUsers} setAllUsers={setAllUsers} />
            </div>
        </Container>
    )
}

export default Settings