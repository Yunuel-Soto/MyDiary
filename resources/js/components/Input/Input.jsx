import React, { useEffect, useRef } from 'react'
import './input.css'

function Input({value = '', type, width, label, options = [], name, required, onchange = null, onkeyup = null, error = false, className = ''}) {

    const labelRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if(labelRef.current && inputRef.current) {
            labelRef.current.addEventListener('click', (e) => {
                inputRef.current.focus();
            })
        }
    }, []);

    function inputType() {
        if(type == 'select') {
            return (
                <select className={error ? 'input-error' : ''} ref={inputRef} name={name} required={required} onChange={onchange} onKeyUp={onkeyup}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.text}</option>
                    ))}
                </select>
            )
        } else if(type == 'textarea') {
            return (
                <textarea
                    ref={inputRef}
                    defaultValue={value}
                    required={required}
                    name={name}
                    style={{ width: width }}
                    placeholder=''
                    onChange={onchange}
                    onKeyUp={onkeyup}
                    className={error ? 'input-error' : ''}
                >
                </textarea>
            )
        } else {
            return (
                <input
                    ref={inputRef}
                    type={type}
                    style={{ width: width }}
                    defaultValue={value}
                    name={name}
                    required={required}
                    placeholder=''
                    onChange={onchange}
                    onKeyUp={onkeyup}
                    className={`${error ? 'input-error' : ''} ${className}`}
                />
            )
        }
    }
  return (
    <div className={type == 'checkbox' ? 'content_check' :'content_input'} style={ type === 'textarea' ? {height: '120px'} : {} }>
        {inputType()}
        <label ref={labelRef}>{label}</label>
    </div>
  )
}

export default Input
