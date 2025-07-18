import { Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import DropFile from '../DropFile/DropFile'
import Button from '../Button/Button';
import ModalFriends from './ModalFriends';

function ModalUpdateEntry({openModal, entry, title}) {

    const [imgValue, setImgValue] = useState('assets/img/public.png');
    const [openDialog, setOpenDialog] = useState('none');
    const [openModalFriends, setOpenModalFriends] = useState(false);

    const {data, setData, put, post, errors, processing} = useForm({
        body: '',
        visibilityValue: 'public',
        file: null,
        friend: []
    });

    useEffect(() => {
        let value = entry.visibility
        setValueVisibility(value);

        setData('body', entry.body);
        setData('visibilityValue', entry.visibility);

        if(entry.image_entry) {
            setData('file', entry.image_entry.path);
        }

    }, [])


    function submit(e)
    {
        e.preventDefault();
        post(route('update.entry', entry.id), {
            forceFormData: true,
            onSuccess: () => {
                setOpenModal(e);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    const clickDialog = (e) => {
        e.stopPropagation();

        if(openDialog == 'flex') {
            setOpenDialog('none');
        } else {
            setOpenDialog('flex');
        }
    }

    document.addEventListener('click', (e) => {
        setOpenDialog('none');
    });

    function setOpenModal(e)
    {
        if(openModal) {
            openModal = false;

            let contentModal = document.getElementById(`update-${entry.id}`);
            let modal = contentModal.querySelector('.modal');

            contentModal.classList.remove('open_content_modal');
            modal.classList.remove('open_modal');
        } else {
            openModal = true;
        }
    }

    function setValueVisibility(value)
    {
        setData("visibilityValue", value);

        value == 'public' ? setImgValue('assets/img/public.png') : '';
        value == 'private' ? setImgValue('assets/img/seguro.png') : '';
        value == 'friends' ? setImgValue('assets/img/friends.png') : '';
    }

    function changeVisibility(value) {        
        setValueVisibility(value);

        if(value == 'friends') {
            setOpenModalFriends(true);
        } else {
            setOpenModalFriends(false);
        }
    }

  return (
    <div className={`content_modal modalDelete ${openModal ? 'open_content_modal' : ''}`} id={`update-${entry.id}`}>
        <form className={`formDiary ${openModal ? 'open_modal' : ''}`} onSubmit={submit}>
            <label className='title_modal'>{title}</label>
            <Input
                type='textarea'
                label='¿Como te sientes hoy?'
                name='body'
                required={true}
                onchange={(e) => {setData("body", e.target.value)}}
                value={data.body}
            />
            <DropFile
                onchange={(e) => {setData("file", e.target.files[0])}}
                {...(entry.image_entry ? { value: `/storage/${entry.image_entry.path}` } : {})}
                {...(entry.image_entry ? { name: `${entry.image_entry.name}` } : {})}
            />
            <div className='content_btn'>
                <div className='content_config'>
                    <img src={imgValue} onClick={clickDialog}/>
                    <img src='assets/img/flecha_abajo.png' onClick={clickDialog}/>
                    <div className='content_options' style={{ display: openDialog }}>
                        <div onClick={(e) => changeVisibility('public')} title='Todos tus amigos podran ver esta entrada'><img src='assets/img/public.png' /> Publico</div>
                        <div onClick={(e) => changeVisibility('private')} title='Solo tu podras ver esta entrada'><img src='assets/img/seguro.png' /> Privado</div>
                        <div onClick={(e) => changeVisibility('friends')} title='Solo los amigos que tu eligas podran ver la entrada'><img src='assets/img/friends.png' /> Solo algunos amigos</div>
                    </div>
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
                        text={'Publicar entrada'}
                        className={'btn-normal'}
                        width={'10%'}
                        minWidth={'150px'}
                        type='submit'
                        disable={processing}
                        loading={processing}
                    />
                </div>
            </div>            
          </form>
          <ModalFriends
                openModal={openModalFriends}
                setData={setData}
                entry={entry}
            />
    </div>
    
  )
}

export default ModalUpdateEntry
