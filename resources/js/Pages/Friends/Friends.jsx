import { Head } from '@inertiajs/react'
import React from 'react'
import './friends.css'

function Friends({users}) {
    console.log(users);
  return (
    <>
        <Head>
            <title>Amigos</title>
        </Head>
        <div className='content_friends'>
            <div className='search_content'>
                <div className='search'>
                    <input type='text' placeholder='Buscar amigos' name='search'/>
                    <img src="/assets/img/search.png"/>
                </div>
            </div>
            <section className='friends'></section>
        </div>
    </>
  )
}

export default Friends
