import React from 'react'
import { getFormattedDate } from '../../utils/helper'

const ActivityRow = ({ log, index }) => {
    return (
        <tr style={{ background: index == 0 ? "#daffda" : "" }}>
            <td
                style={{ background: index == 0 ? "#daffda" : "" }}
                className="text-center"
            >
                {index + 1}.
            </td>
            <td
                style={{ background: index == 0 ? "#daffda" : "" }}
                className="text-center"
            >
                {getFormattedDate(log?.date)}
            </td>
            <td
                style={{ background: index == 0 ? "#daffda" : "" }}
                className="text-center"
            >
                {log?.type}
            </td>
            <td
                style={{ background: index == 0 ? "#daffda" : "" }}
                className="text-center"
            >
                {log?.action}
            </td>
            <td
                style={{ background: index == 0 ? "#daffda" : "" }}
                className="text-center"
            >
                {log?.message}
            </td>
        </tr>
    );
}

export default ActivityRow