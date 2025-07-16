import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import './friends.css'
import Button from '../../components/Button/Button'
import React, { use, useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash';

function Friends({users, type}) {
    const { post, errors, processing } = useForm();
    const [ textButton, setTextButton ] = useState({});
    const [ loading, setLoading ] = useState(null);
    const { user } = usePage().props;
    const [ moveBtn, setMoveBtn ] = useState('left');

    console.log(user);

    function submit(e, id)
    {
        e.preventDefault();

        setLoading(id); // solo este ID activa el loader

        let URL = '';

        if(type == '1') {
            URL = route('acceptedFriendRequest', id);
        } else {
            URL = route('friendRequest', id);
        }

        post(URL, {
            onSuccess: () => {
                if(textButton[id] == 'Cancelar invitacion') {
                    setTextButton(prev => ({
                        ...prev,
                        [id]: 'Enviar solicitud de amistad'
                    }));
                } else {
                    setTextButton(prev => ({
                        ...prev,
                        [id]: 'Cancelar invitacion'
                    }));
                }
            },
            onFinish: () => {
                setLoading(null);
            }
        });
    }



    function friendOrNot(otherUser)
    {
        let text = '';

        let requestFriends = user.friends_s?.find(request => request.id == otherUser.id && request.status == 'accepted');

        if(!requestFriends) {
            requestFriends = user.friends_r?.find(request => request.pivot.sender_id == otherUser.id && request.pivot.status == 'accepted');
        }

        let requestOnly = user.friends_s?.find(request => request.id == otherUser.id && request.pivot.status == 'pending');

        if(requestFriends) {
            text = 'Ya son amigos';
        }else if(requestOnly) {
            text = 'Cancelar invitacion';
        } else {
            text = 'Enviar solicitud de amistad';
        }

        setTextButton(prev => ({
            ...prev,
            [otherUser.id]: text
        }));
    }

    const handleNavigation = useCallback(debounce((type) => {
        if(type == '1') {
            setMoveBtn('users');
        } else if (type == '2') {
            setMoveBtn('requests');
        } else {
            setMoveBtn('profiles');
        }

        router.get(route('index.friends', [type]), {

        }, {
           preserveState: true,
           replace: true,
           only: ['users', 'type']
        });
    }), []);

    function rejectButton(otherUser)
    {

    }

    useEffect(() => {
        users.forEach(friend => {
            friendOrNot(friend);
        });

        if(type == '1') {
            setMoveBtn('users');
        } else if (type == '2') {
            setMoveBtn('requests');
        } else {
            setMoveBtn('profiles');
        }

    }, [])

  return (
    <>
        <Head>
            <title>Perfiles</title>
        </Head>
        <div className='content_friends'>
            <div className='search_content'>
                <div className='search'>
                    <input type='text' placeholder='Buscar amigos' name='search'/>
                    <img src="/assets/img/search.png"/>
                </div>
            </div>
            <div className='content_type'>
                <label  onClick={() => handleNavigation(null)}>Perfiles</label>
                <label  onClick={() => handleNavigation('1')}>Amigos</label>
                <label  onClick={() => handleNavigation('2')}>Solicitudes</label>
                <span className={`back_type ${moveBtn}`}></span>
            </div>
            <section className='friends'>
                {users.map((otherUser, index) => {
                    return (
                        <form className='cardFriend' key={otherUser.id} onSubmit={(e) => submit(e, otherUser.id)}>
                            <picture>
                                <img src='/assets/img/usuario_big.png'/>
                            </picture>
                           <div>
                                <label>{otherUser.name}</label>
                           </div>
                           <div className='content_btns'>
                                <Button
                                    text={textButton[otherUser.id] || 'Enviar invitacion de amistad'}
                                    type='submit'
                                    disable={processing === otherUser.id}
                                    loading={loading === otherUser.id}
                                />
                                {() => rejectButton(otherUser)}
                           </div>
                        </form>
                    );
                })}
            </section>
        </div>
    </>
  )
}

export default Friends
