import React from 'react'
import './navbar.css'
import { Link, usePage } from '@inertiajs/react'

function Navbar() {
    const { user } = usePage().props;

    const url = () => {
        if(user) {
            return route('homeSession');
        } else {
            return route('main');
        }
    }

  return (
    <nav className='navbar'>
        <ul>
            <li>
                <Link href={url()}>
                    <img src="/assets/img/diario-de-viaje.png" alt='Logo'/>
                    <label>My Diary</label>
                </Link>
            </li>
        </ul>
        <ul className='menu1'>
            <li>
                {user ? (
                    <div className='links'>
                        <Link title='Configuracion de perfil'>
                            {user.name}
                        </Link>
                        <Link href={route('logout')}>Cerrar sesión</Link>
                    </div>
                ) : (
                    <div className='logSing'>
                        <Link href={route('loginForm')}>
                            Iniciar sesión
                        </Link>
                        <Link href={route('singInForm')}>
                            Crear cuenta
                        </Link>
                    </div>
                )}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
