import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import './layout.css'
import Navbar from '../components/NavBar/Navbar'
import Sidebar from '../components/SideBar/Sidebar';

function Layout({children}) {

    const { component } = usePage();

    const showNavBar = [
        'AuthPages/Login',
        'AuthPages/SingIn',
        'Home/Home'
    ].includes(component);

  return (
    <div className={!showNavBar ? 'main_layout' : 'main_layout_default'}>
        {showNavBar ? <Navbar/> : <Sidebar/>}

        <main>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
        {children}
        remove  canges
        </main>
    </div>
  )
}

export default Layout
