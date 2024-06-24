import React, { useEffect, useState } from 'react'
import ActivityList from './ActivityList'
import { getLogs } from '../../apis/activityLogApis'
import { selectFetchAgainStatus } from '../../app/features/fetchAgainSlice';
import { useSelector } from 'react-redux';

const TodayActivities = () => {
    const fetchAgainStatus = useSelector(selectFetchAgainStatus);

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await getLogs();
            console.log("logs: ", data);
            if (data) {
                setLogs(data);
            }
        })()
    }, [fetchAgainStatus])

    return (
        <div className='my-3 h-75'>
            <div className='border-bottom pb-2' >
                <h2 className='p-0 my-1'>Today's Activities</h2>    
                <p>June 14, 2024</p>
            </div>
            <div className='overflow-auto' style={{height: '80%'}}>
                <ActivityList logs={logs} />
            </div>
        </div>
    )
}

export default TodayActivities