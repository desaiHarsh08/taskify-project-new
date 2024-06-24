import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import ActivityRow from './ActivityRow'

const ActivityList = ({ logs }) => {
    useEffect(() => {
        console.log(logs)
    }, [logs]);

    return (
        <Table bordered className='mt-3' style={{minWidth: "891px", overflow: 'auto'}}>
            <thead>
                <tr className='text-center'>
                    <th className='bg-body-secondary'>Sr. No</th>
                    <th className='bg-body-secondary' >Time</th>
                    <th className='bg-body-secondary' >Type</th>
                    <th className='bg-body-secondary' >Action</th>
                    <th className='bg-body-secondary' >By</th>
                </tr>
            </thead>
            <tbody>
                {logs?.map((log, index) => (
                    <ActivityRow key={`log-${index}`} log={log} index={index} />
                ))}
            </tbody>
        </Table>
    )
}

export default ActivityList