import React, { useEffect, useState } from 'react'
import './alertError.css';

function AlertError({ message }) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      }, []);

  return (
    <div className={`alertError ${visible ? "" : "hide"}`}>
        <div className='title'>
            Error
        </div>
        <div className='body'>
            {message}
        </div>
    </div>
  )
}

export default AlertError
