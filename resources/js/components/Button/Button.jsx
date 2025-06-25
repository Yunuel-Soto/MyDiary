import React from 'react'
import './button.css'
import Loader from '../Loader/Loader'
function Button({text, className = 'btn-normal', width, minWidth = '270px', loading, onclick, type = 'submit'}) {
  return (
    <button
        className={className}
        style={{ width: width, minWidth: minWidth }}
        onClick={onclick}
        type={type}
    >
        {loading ? <Loader/> : text}
    </button>
  )
}

export default Button
