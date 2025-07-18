import React, { useState } from 'react'
import './entry.css';
import { Link, usePage } from '@inertiajs/react';
import ModalDelete from '../Modals/ModalDelete';
import ModalUpdateEntry from '../Modals/ModalUpdateEntry';
function Entry({entry}) {
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const { user } = usePage().props;
    
    function openModalDelete(e)
    {
        if (openModal) {
            setOpenModal(false);

            // Esperar un momento antes de reabrir
            setTimeout(() => {
              setOpenModal(true);
            }, 50); // 50-100ms suele ser suficiente
          } else {
            setOpenModal(true);
          }
    }

    function actionOpenModalUpdate(e)
    {
        if(openModalUpdate) {
            setOpenModalUpdate(false);

            setTimeout(() => {
                setOpenModalUpdate(true);
            }, 50);
        } else {
            setOpenModalUpdate(true);
        }
    }

    function image()
    {
        let link = '';

        if(entry.visibility == 'public') {
            link = 'assets/img/public.png';
        } else if (entry.visibility == 'private') {
            link = 'assets/img/seguro.png';
        } else {
            link = 'assets/img/friends.png';
        }

        return <img src={link}/>
    }

    let divDelete = `
        <label>${new Date(entry.created_at).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</label> <br>
        <label>${entry.body}</label>
    `;

  return (
    <>
        <div className='card'>
            <div className='title'>
                <label>{entry.creator.name}</label>
                {user.id === entry.creator.id ? (
                    <div className='buttons'>
                        <label onClick={openModalDelete}>
                            <img src='assets/img/eliminar.png'/>
                        </label>
                        <label onClick={actionOpenModalUpdate}>
                            <img src='assets/img/editar.png'/>
                        </label>
                    </div>
                ) : ('')}                  
            </div>
            <div className='content_body'>
                <img src={!entry.creator.image_user ? entry.creator.image_user.path : '/assets/img/avatar.png'}/>
                {entry.body}
            </div>
            <picture>
                <img src={entry.image_entry ? `/storage/${entry.image_entry?.path}` : ''}/>
            </picture>
            <div className='footer'>
                {image()}
                {new Date(entry.created_at).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        </div>
        <ModalDelete
            entity={entry}
            openModal={openModal}
            title={'Eliminar entrada'}
            div={divDelete}
            URL={route('delete.entry', entry.id)}
        />
        <ModalUpdateEntry
            entry={entry}
            openModal={openModalUpdate}
            title={'Actualizar entrada'}
            URL={route('update.entry', entry.id)}
        />
    </>
  )
}

export default Entry
