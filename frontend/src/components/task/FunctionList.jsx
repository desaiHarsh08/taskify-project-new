import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchAllFunctionsByTaskId } from '../../apis/functionApis';
import FunctionCard from './FunctionCard';

const FunctionList = ({ task }) => {
    const navigate = useNavigate();

    const [functionsArr, setFunctionsArr] = useState([]);

    useEffect(() => {
        setFunctionsArr(task?.functions)
    }, [task]);

    const handleFunctionClick = (functionId) => {
        navigate(`${functionId}`, { replace: true });
    }
    return (
        <Container className='w-75'>
            {functionsArr?.length > 0 ?
                (
                    functionsArr?.map((func, index) => (
                        <FunctionCard key={`function-${index}`} func={func} index={index} />
                    ))
                )
                : <p className='text-center py-5'>No function added!</p>
            }
        </Container>
    )
}

export default FunctionList