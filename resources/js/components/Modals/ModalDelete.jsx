import React from 'react'
import Button from '../Button/Button';
import { useForm } from '@inertiajs/react';

function ModalDelete({ entity, openModal, div = null, title='No hay texto', URL = null }) {

    const { data, delete: destroy, errors, processing } = useForm();

    function submit(e)
    {
        console.log('delete');
        e.preventDefault();
        console.log(URL);
        destroy(URL, {
            onSuccess: () => {
                setOpenModal(e);
            }
        });
    }

    function setOpenModal(e)
    {
        if(openModal) {
            openModal = false;

            let contentModal = document.getElementById(`delete-${entity.id}`);
            let modal = contentModal.querySelector('.modal');

            contentModal.classList.remove('open_content_modal');
            modal.classList.remove('open_modal');
        } else {
            openModal = true;
        }
    }

  return (
    <div className={`content_modal modalDelete ${openModal ? 'open_content_modal' : ''}`} id={`delete-${entity.id}`}>
        <form onSubmit={submit} className={`modal ${openModal ? 'open_modal' : ''}`}>
            <div className='title'>{title}</div>
            <div className='body'>
                {div ? <div dangerouslySetInnerHTML={{ __html: div }} /> : 'empty'}
            </div>
            <div className='footer'>
                <Button
                    text='Cancelar'
                    width={'25%'}
                    minWidth='100px'
                    onclick={setOpenModal}
                    type='button'
                    className='btn-disable'
                />
                <Button
                    text='Eliminar'
                    width={'25%'}
                    minWidth='100px'
                    disable={processing}
                    loading={processing}
                    type='submit'
                />
            </div>
        </form>
    </div>
  )
}

export default ModalDelete
