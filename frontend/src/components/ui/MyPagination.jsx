import React from 'react'
import { Pagination } from 'react-bootstrap'

const MyPagination = ({ lastPage, pageNumber, totalEntries, totalPages, setPageNumber }) => {
    const pages = Array.isArray(totalPages) ? totalPages : Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div>
            <Pagination>
                {pages.map((page) => (
                    <Pagination.Item 
                        key={page} 
                        active={page === pageNumber + 1}
                        onClick={() => setPageNumber(page - 1)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
            <br />
        </div>
    )
}

export default MyPagination