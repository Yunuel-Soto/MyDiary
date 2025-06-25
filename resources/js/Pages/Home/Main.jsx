import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import './home.css'
import Input from '../../components/Input/Input'
import DropFile from '../../components/DropFile/DropFile'
import Button from '../../components/Button/Button'
import ModalFriends from '../../components/Modals/ModalFriends'
import AlertSuccess from '../../components/alerts/AlertSuccess/AlertSuccess'
import Entry from '../../components/Entry/Entry'
import ModalDelete from '../../components/Modals/ModalDelete'

function Main({ entries }) {
    const { user } = usePage().props;

    const {data, setData, post, errors, processing} = useForm({
        body: "",
        visibilityValue: "public",
        file: null,
        friend: []
    })

    const { flash } = usePage().props;

    const [openDialog, setOpenDialog] = useState('none');
    const [imgValue, setImgValue] = useState('assets/img/public.png');
    const [openModal, setOpenModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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


    function changeVisibility(value) {
        setData("visibilityValue", value);

        value == 'public' ? setImgValue('assets/img/public.png') : '';
        value == 'private' ? setImgValue('assets/img/seguro.png') : '';
        value == 'friends' ? setImgValue('assets/img/friends.png') : '';

        if(value == 'friends') {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route('create.entry'), {
            forceFormData: true,
            onSuccess: () => {
                let inputs = document.querySelectorAll('textarea, pinput, select');
                inputs.forEach(input => {
                    input.value = '';
                });

                let img = document.querySelector('.dropFile img');
                let label = document.querySelector('.dropFile label')
                img.src = 'assets/img/camara.png';
                label.textContent = 'Añadir imagen';
                changeVisibility('public');

                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 4000);
            }
        });
    }
  return (
    <>
        {showSuccess &&
            <AlertSuccess message={'Entrada guardada con exito'} />
        }
        <div className='mainContent'>
            <Head>
                <title>Home</title>
            </Head>

            <form className='formDiary' onSubmit={submit}>
                <Input
                    type='textarea'
                    label='¿Como te sientes hoy?'
                    name='body'
                    required={true}
                    onchange={(e) => {setData("body", e.target.value)}}
                />
                <DropFile
                    onchange={(e) => {setData("file", e.target.files[0])}}
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
                <ModalFriends
                    openModal={openModal}
                    setData={setData}
                />
            </form>
            <section className='content_cards'>
                {entries.map((entry) => (
                    <Entry entry={entry}/>
                ))}
            </section>
        </div>
    </>
  )
}

export default Main
