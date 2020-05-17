import React from 'react'
import cc from 'classcat';
import { FaCloudDownloadAlt } from "react-icons/fa";

// provides a download button that enables download users data as props
// receives the disable props that is updted by the Users component and enables
 // us determine when the button should be disabled or not
 
function Download({path, disable}) {

    return (
        
        <a
        type="button"
        className={cc({
            btn: true,
            disabled: disable,
            'download-btn': !disable,
          })}
        href={`${path}&format=csv&dl`}
      >
        <FaCloudDownloadAlt className="download-svg" /> Download results</a>
    )
}

export default Download