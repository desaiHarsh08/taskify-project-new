import React from 'react'
import { getFormattedDate } from '../../utils/helper'

const ActivityRow = ({ log, index }) => {
    return (
        <tr>
            <td className='text-center'>{index + 1}.</td>
            <td className='text-center' >{getFormattedDate(log?.date)}</td>
            <td className='text-center' >{log?.type}</td>
            <td className='text-center' >{log?.action}</td>
            <td className='text-center' >{log?.message}</td>
        </tr>
    )
}

export default ActivityRow