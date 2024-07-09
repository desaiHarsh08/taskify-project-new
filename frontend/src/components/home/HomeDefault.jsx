import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HomeAction from './HomeAction';
import AdditionalStats from './AdditionalStats';
import TodayActivities from './TodayActivities';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchAgainStatus } from '../../app/features/fetchAgainSlice';
import { setStats } from '../../app/features/statsSlice';
import { getStats } from '../../apis/taskApis';

const HomeDefault = () => {
    const dispatch = useDispatch();

    const fetchAgainStatus = useSelector(selectFetchAgainStatus);

    useEffect(() => {
        (async() => {
            const { data, error } = await getStats();
            console.log("stats:", data)
            if (data) {
                dispatch(setStats(data));
            }
        })();
    }, [fetchAgainStatus])
    return (
        <Container fluid id='home-default' className='p-4 h-100 bo rder border- danger'>
            <Row className='m-0 gap-3 h-100 my-row'>
            {window.innerWidth < 767 && (<Col className='p-2 d-flex align-items-center flex-column gap-2 '>
                    <AdditionalStats />
                </Col>)}
                <Col className='p-0 col-md-9 h-100'>
                    <HomeAction />
                    <TodayActivities />
                </Col>
                {window.innerWidth > 767 && (<Col className='p-2 d-flex align-items-center flex-column gap-2 '>
                    <AdditionalStats />
                </Col>)}
            </Row>
        </Container>
    )
}

export default HomeDefault