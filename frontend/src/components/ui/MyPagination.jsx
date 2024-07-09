import React from "react";
import { Pagination } from "react-bootstrap";

const MyPagination = ({ listData, loadPage, setLoadPage }) => {

    const pages = Array.from({ length: listData?.totalPages }, (_, i) => i + 1);

    return (
        <div>
            <Pagination>
                {pages.map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === loadPage + 1}
                        onClick={() => setLoadPage(page - 1)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
            <br />
        </div>
    );
};

export default MyPagination;
