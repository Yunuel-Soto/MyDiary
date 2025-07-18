import React, { useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Input from '../Input/Input';
import Button from '../Button/Button';
import './modal.css'

function ModalFriends({ openModal = false, setData, entry = null }) {

    const { user } = usePage().props;
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [checked, setChecked] = useState({});


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
        let newList = [...selectedFriends]

        if(e.target.checked) {
            newList.push(e.target.value);

            setChecked(prev => ({
                ...prev,
                [e.target.value]: true
            }));

        } else {
            newList = newList.filter(id => id !== e.target.value);

            setChecked(prev => ({
                ...prev,
                [e.target.value]: false
            }));
        }

        setSelectedFriends(newList);

        setData("friend", newList);
    }

    function checkedAction(id)
    {        
        if (entry) {
            let checkFriend = entry.users.find(user => user.id == id);
    
            return checkFriend ? true : false;
        }

        return false;
    }

    useEffect(() => {
        user.friends_s.
            filter(friend => friend.pivot?.status == 'accepted')
            .forEach((friend, index) => {
                let bool = checkedAction(friend.id);

                setChecked(prev => ({
                    ...prev,
                    [friend.id]: bool
                }));
            });
        
        user.friends_r.
            filter(friend => friend.pivot?.status == 'accepted')
            .forEach((friend, index) => {
                let bool = checkedAction(friend.id);

                setChecked(prev => ({
                    ...prev,
                    [friend.id]: bool
                }));
            });
        
    }, []);    
    
  return (
    <div className={`content_modal ${entry ? `friend-${entry.id}` : ''} ${openModal ? 'open_content_modal' : ''}`}>
        <div style={entry ? {width: '100%'} : {}} className={`modal ${openModal ? 'open_modal' : ''}`}>
            <div className='title'>Selecciona tus amigos</div>
            <div className='body'>
                {user.friends_s.length > 0 ? user.friends_s.
                    filter(friend => friend.pivot?.status == 'accepted')
                    .map((friend, index) => (
                        <Input
                            type='checkbox'
                            label={friend.name}
                            name="friend[]"
                            value={friend.id}
                            onchange={toggleFriends}
                            check={checked[friend.id]}
                        />
                    )) : ('')}
                  {user.friends_r.length > 0 ? user.friends_r.
                      filter(friend => friend.pivot?.status == 'accepted')
                      .map((friend, index) => (
                            <Input
                                type='checkbox'
                                label={friend.name}
                                name="friend[]"
                                value={friend.id}
                                onchange={toggleFriends}
                                check={checked[friend.id]}                            
                            />
                      )) : ('')}                
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
