import React from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const AllCustomers = () => {
    return (
        <Container fluid className=' h-100 '>
            <div style={{ height: "95%" }}>
                <Outlet />
            </div>
        </Container>
    )
}

export default AllCustomers