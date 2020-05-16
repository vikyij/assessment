import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";



function Pagination({ page, next, previous }) {
    return (
      <div className="paging">
      
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link pag1"
              disabled={page === 1}
              onClick={previous}
            >
              <MdKeyboardArrowLeft className="my-svg" />
            </button>
          </li>
          <li className="page-item">
            <button className="page-link pag2" onClick={next}>
              <MdKeyboardArrowRight className="svg1" />
            </button>
          </li>
        </ul>
      </div>
    );
  }

  export default Pagination