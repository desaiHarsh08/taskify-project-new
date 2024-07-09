import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchAllFunctionsByTaskId } from '../../apis/functionApis';
import FunctionCard from './FunctionCard';

// eslint-disable-next-line react/prop-types
const FunctionList = ({ task }) => {
    const navigate = useNavigate();

    const [functionsArr, setFunctionsArr] = useState([]);

    useEffect(() => {
        if (task) {
            const fnArr = [];
            // eslint-disable-next-line react/prop-types
            for (let i = task?.functions.length - 1; i >= 0; i--) {
                fnArr.push(task.functions[i]);
            }
            setFunctionsArr(fnArr);
        }
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