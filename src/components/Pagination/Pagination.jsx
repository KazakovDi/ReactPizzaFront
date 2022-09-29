import React from "react";

import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
const Paginate = ({currentPage, numberOfPages, onChangePage})=> {
    return (
        <ReactPaginate 
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={event=> onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={numberOfPages}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        />
    )
}

export default Paginate