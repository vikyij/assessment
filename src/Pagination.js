import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";



function Pagination({ page, next, previous,disable }) {
  function handlePrevious() {
    if (disable) {
      return;
    }

    previous();
  }

  function handleNext() {
    if (disable) {
      return;
    }

    next();
  }

    return (
      <div className="paging d-inline">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link pag1"
              disabled={page === 1 || disable}
              onClick={handlePrevious}
            >
              <MdKeyboardArrowLeft className="my-svg" />
            </button>
          </li>
          <li className="page-item">
            <button 
               className="page-link pag2" 
               disabled={disable}
               onClick={handleNext}>
              <MdKeyboardArrowRight className="svg1" />
            </button>
          </li>
        </ul>
     </div>
    );
  }

  export default Pagination