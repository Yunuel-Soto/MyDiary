import React, { useState } from 'react'
import './dropFile.css'

function DropFile({ onchange = null, value = 'assets/img/camara.png', name='Añadir imagen'}) {

    const [imagenPreview, setImagenPreview] = useState(value);
    const [fileName, setFileName] = useState(name);

    const setImagen = (e) => {
        const file = e.target.files[0];

        if(file) {
            setImagenPreview(URL.createObjectURL(file));
            setFileName(file.name);
        } else {
            setImagenPreview('assets/img/camara.png');
            setFileName('Añadir imagen');
        }

        if(onchange) {
            onchange(e);
        }
    }

  return (
    <div className='dropFile'>
        <img src={imagenPreview} alt='Imagen del input de imagen' />
        <label>{fileName}</label>
        <input type='file' name="file" onChange={setImagen} accept='image/*'/>
    </div>
  )
}

export default DropFile
