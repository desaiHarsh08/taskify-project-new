import React from 'react'
import { Col } from 'react-bootstrap'
import { selectStats } from '../../app/features/statsSlice';
import { useSelector } from 'react-redux';
import styles from '../../styles/AdditionalStats.module.css'

const AdditionalStats = () => {
    const stats = useSelector(selectStats);

    return (
        <>
            <div className={styles.card}>
                <h5 class="card-title text-center my-3">All Task (This month)</h5>
                <div class="card-body p-0 my-0 d-flex justify-content-center gap-3 align-items-center ">
                    <div className='d-flex justify-content-center'>
                        <img
                            src="/month-tasks-img.jpeg"
                            class="card-img-top"
                            alt="..."
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <p class="card-text my- 2 fs-3 text-center">{stats?.currentTasks}</p>
                </div>
            </div>
            <div className={styles.card}>
                <h5 class="card-title text-center my-3">Completed</h5>
                <div class="card-body p-0 my-0 d-flex justify-content-center gap-3 align-items-center ">
                    <div className='d-flex justify-content-center'>
                        <img
                            src="/completed-task-img.avif"
                            class="card-img-top"
                            alt="..."
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <p class="card-text my- 2 fs-3 text-center">{stats?.currentTaskCompleted}</p>
                </div>
            </div>
            <div className={styles.card}>
                <h5 class="card-title text-center my-3">High Priority</h5>
                <div class="card-body p-0 my-0 d-flex justify-content-center gap-3 align-items-center ">
                    <div className='d-flex justify-content-center'>
                        <img
                            src="/high-priority-img.png"
                            class="card-img-top"
                            alt="..."
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <p class="card-text my- 2 fs-3 text-center">{stats?.currentHighPriorityTasks}</p>
                </div>
            </div>
            <div className={styles.card}>
                <h5 class="card-title text-center my-3">Pending Task</h5>
                <div class="card-body p-0 my-0 d-flex justify-content-center gap-3 align-items-center ">
                    <div className='d-flex justify-content-center'>
                        <img
                            src="/pending-img.webp"
                            class="card-img-top"
                            alt="..."
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <p class="card-text my- 2 fs-3 text-center">{Number(stats?.currentTasks) - Number(stats?.currentTaskCompleted)}</p>
                </div>
            </div>
        </>
    )
}

export default AdditionalStats