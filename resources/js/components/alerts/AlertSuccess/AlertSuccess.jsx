import React, { useEffect, useState } from 'react'
import './alertSuccess.css';
function AlertSuccess({ message }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }, []);

  return (
    <div className={`alertSuccess ${visible ? "" : "hide"}`}>
        <div className='title'>
            Success
        </div>
        <div className='body'>
            {message}
        </div>
    </div>
  )
}

export default AlertSuccess
