import { IconButton } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import React from 'react'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const TablePagination = (props) => {
   
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (e) => {
        onPageChange(e, 0);
      };
    const handleNextButton = (e) => {
        onPageChange(e ,page+1)
    }

    const handleBackButton = (e) => {
        onPageChange(e , page-1)
    }

    const handleLastPageButtonClick = (e) => {
        onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }
   
    return (
        <div>
             <div>Page : {page+1} of {Math.max(0, Math.ceil(count / rowsPerPage))} </div>
        <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
       <FirstPageIcon />
      </IconButton>    

        <IconButton onClick={handleBackButton} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft /> 
        </IconButton>
        <IconButton onClick={handleNextButton} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        <KeyboardArrowRight /> 
        </IconButton>
        <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
      <LastPageIcon />
      </IconButton>

        </div>
    )
}

export default TablePagination
