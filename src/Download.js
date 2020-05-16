import React from 'react'
import cc from 'classcat';
import { FaCloudDownloadAlt } from "react-icons/fa";


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