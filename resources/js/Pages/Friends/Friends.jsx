import { Head } from '@inertiajs/react'
import React from 'react'
import './friends.css'
import Button from '../../components/Button/Button'

function Friends({users}) {
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
            <section className='friends'>
                {users.map((user, index) => {
                    return (
                        <div className='cardFriend' key={user.id}>
                            <picture>
                                <img src='/assets/img/usuario_big.png'/>
                            </picture>
                           <div>
                                <label>{user.name}</label>
                           </div>
                            <Button
                                text={'Agregar como amigo'}
                                type='button'
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    </>
  )
}

export default Friends
