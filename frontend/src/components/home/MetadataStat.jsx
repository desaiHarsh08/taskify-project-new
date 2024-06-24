import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { IoIosPeople } from 'react-icons/io'
import { SiTask } from 'react-icons/si'
import { FiType } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { selectStats } from '../../app/features/statsSlice';

const MetadataStat = () => {
    const stats = useSelector(selectStats);

    return (
        <>
            <Col className="p-0 col-12 col-md-3">
                <div className="card" style={{ minHeight: "170px" }}>
                    <div className="card-header">Customer Stats</div>
                    <div className="card-body">
                        <h5 className="card-title d-flex align-items-center gap-2 fs-4">
                            <IoIosPeople className='fs-4' />
                            <p>Customers</p>
                        </h5>
                        <p className="card-text ">Since June 12, 2024</p>
                        <p className="card-text mb- fs-1">{stats?.totalCustomers}</p>
                    </div>
                </div>
            </Col>
            <Col className="p-0 col-12 col-md-3">
                <div className="card" style={{ minHeight: "170px" }}>
                    <div className="card-header">Task Stats</div>
                    <div className="card-body">
                        <h5 className="card-title d-flex align-items-center gap-2 fs-4">
                            <SiTask className='fs-4' />
                            <p>All Tasks</p>
                        </h5>
                        <p className="card-text ">Since June 12, 2024</p>
                        <p className="card-text mb- fs-1">{stats?.totalTasks}</p>
                    </div>
                </div>
            </Col>
            <Col className="p-0 col-12 col-md-3">
                <div className="card" style={{ minHeight: "170px" }}>
                    <div className="card-header">Task Stats</div>
                    <div className="card-body">
                        <h5 className="card-title d-flex align-items-center gap-2 fs-4">
                            <FiType className='fs-4' />
                            <p>Task Types</p>
                        </h5>
                        <p className="card-text ">New Enquiry: {stats?.newPumpInquiryTasks}</p>
                        <p className="card-text ">Service Task: {stats?.serviceTasks}</p>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default MetadataStat