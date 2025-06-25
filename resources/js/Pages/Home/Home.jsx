import { Head } from '@inertiajs/react'
import React from 'react'
import './home.css'
function Home() {
  return (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <main>
            <section className=''>
                <h1><label className='title'>My Diary</label><br/> es tu diario personal</h1>
            </section>
            <footer>
                <p>
                    Mi Diario Digital es una aplicación intuitiva y segura que te
                    permite registrar tus pensamientos, emociones y experiencias diarias.
                    Diseñada con una interfaz limpia y minimalista, la aplicación ofrece
                    funciones como entradas personalizadas con imágenes, categorización
                    por estados de ánimo y fechas, así como una búsqueda rápida para
                    encontrar recuerdos específicos. Además, cuenta con sincronización en
                    la nube y opciones de privacidad avanzadas para que tus escritos estén
                    siempre protegidos. Ideal para quienes buscan reflexionar, organizar
                    sus ideas y llevar un registro de su día a día de manera sencilla y
                    accesible.
                </p>
            </footer>
        </main>
    </>
  )
}

export default Home
