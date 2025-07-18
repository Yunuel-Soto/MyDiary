import { Link, usePage, useForm } from '@inertiajs/react'
import React, {useEffect, useState} from 'react'
import './layout.css'
import Navbar from '../components/NavBar/Navbar'
import Sidebar from '../components/SideBar/Sidebar';

function Layout({children}) {

    const { component } = usePage();
    const { UsersSessions, user } = usePage().props;
    const [selected, setSelected] = useState();

    const { post } = useForm();

    const showNavBar = [
        'AuthPages/Login',
        'AuthPages/SingIn',
        'Home/Home'
    ].includes(component);

    function newUser(e)
    {
        post(route('newUserAuth', [e.target.value]), {
            onSuccess: () => {
                location.reload();
            }
        });
    }

    function selectedAuth(id)
    {

    }

  return (
    <div className={!showNavBar ? 'main_layout' : 'main_layout_default'}>
        {showNavBar ? <Navbar/> : <Sidebar/>}

        <main>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            {children}
        </main>
    </div>
  )
}

export default Layout
