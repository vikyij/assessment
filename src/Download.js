import React from 'react'
import { FaCloudDownloadAlt } from "react-icons/fa";


function Download({path}) {
    return (
        <a
        type="button"
        className="btn download-btn"
        href={`${path}&format=csv&dl`}
      >
        <FaCloudDownloadAlt className="download-svg" /> Download results
      </a>
    )
}

export default Download