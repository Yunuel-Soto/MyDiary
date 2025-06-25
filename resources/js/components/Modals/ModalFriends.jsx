import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Input from '../Input/Input';
import Button from '../Button/Button';
import './modal.css'

function ModalFriends({ openModal, setData, entry = null }) {

    const { user } = usePage().props;
    const [selectedFriends, setSelectedFriends] = useState([]);

    function setOpenModal(e)
    {
        if(openModal) {
            openModal = false;

            let contentModal = '';

            if(entry) {
                contentModal = document.querySelector(`.friend-${entry.id}`);
            } else {
                contentModal = document.querySelector('.content_modal');
            }

            let modal = contentModal.querySelector('.modal');

            contentModal.classList.remove('open_content_modal');
            modal.classList.remove('open_modal');

        } else {
            openModal = true;
        }
    }

    function toggleFriends(e)
    {
        let newList = {...selectedFriends}

        if(e.target.checked) {
            newList.push(e.target.value);
        } else {
            newList = newList.filter(id => id !== e.target.value);
        }

        setSelectedFriends(newList);
        setData("friend", newList);
    }

  return (
    <div className={`content_modal ${entry ? `friend-${entry.id}` : ''} ${openModal ? 'open_content_modal' : ''}`}>
        <div style={entry ? {width: '100%'} : {}} className={`modal ${openModal ? 'open_modal' : ''}`}>
            <div className='title'>Selecciona tus amigos</div>
            <div className='body'>
                {user.friends.length > 0 ? user.friends.
                    filter(friend => friend.pivot?.status == 'accepted')
                    .map((friend, index) => (
                        <Input
                            type='checkbox'
                            label={friend.name}
                            name="friend[]"
                            value={friend.id}
                            onchange={toggleFriends}
                        />
                    )) : 'Aun no tienes amigos'}
            </div>
            <div className='footer'>
                <Button
                    text='Listo'
                    width={'25%'}
                    minWidth='100px'
                    onclick={setOpenModal}
                    type='button'
                />
            </div>
        </div>
    </div>
  )
}

export default ModalFriends
