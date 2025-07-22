import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import './sidebar.css'

function Sidebar() {
    const { user } = usePage().props;

    const url = () => {
        if(user) {
            return route('homeSession');
        } else {
            return route('main');
        }
    }

  return (
    <nav className='sidebar'>
        <ul>
            <li>
                <Link href={url()}>
                    <img src="/assets/img/diario-de-viaje.png" alt='Logo'/>
                    <label>My Diary</label>
                </Link>
            </li>
            <li>
                <Link href={route('homeSession')}>
                    <img src='/assets/img/masLibros.png' />
                    <label>Querido Diario</label>
                </Link>
            </li>
            <li>
                <Link href={route('index.friends')}>
                    <img src='/assets/img/buscar.png' />
                    <label>Buscar amigos</label>
                </Link>
            </li>
            <li>
                <Link>
                    <img src='/assets/img/libro.png' />
                    <label>Pregunta del dia</label>
                </Link>
            </li>
            {user.admin ? (
                <li>
                    <Link>
                        <img src='/assets/img/ajustes.png' />
                        <label>Administrar</label>
                    </Link>
                </li>
            ) : ('')}
        </ul>
        <ul className='menu1'>
            <li>
                <img src='/assets/img/avatar.png' />
                <div className='links'>
                    <Link title='Configuracion de perfil'>
                        <label>{user.name}</label>
                    </Link>
                    <Link href={route('logout')}>Cerrar sesión</Link>
                </div>
            </li>
        </ul>
    </nav>
  )
}

export default Sidebar
