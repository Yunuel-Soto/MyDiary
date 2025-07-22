import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import './login.css'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import AlertError from '../../components/alerts/AlertError/AlertError'

function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: ""
    });

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    const [ showPassword, setShowPassword ] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);

    function submit(e)
    {
        e.preventDefault();
        post(route('loginInit'), {
            onSuccess: () => {
                setshowAlertError(true);
                setTimeout(() => setshowAlertError(false), 4000);
            }
        });
    }

    function showPass(e)
    {
        setShowPassword(e.target.checked);
    }

  return (
    <div className='content_login'>
        <Head>
            <title>Login</title>
        </Head>

        {showAlertError &&
            <AlertError message={'Credenciales incorrectas'} />
        }

        <form onSubmit={submit}>
            <img src='/assets/img/usuario.png' alt=''/>
            <Input
                type='email'
                label='Correo'
                name='email'
                required={true}
                error={flash.message == 'error_credentials' ? true : false}
                onchange={(e) => {setData("email", e.target.value)}}
            />
            <Input
                type={showPassword ? 'text' : 'password'}
                label='Contraseña'
                name='password'
                required={true}
                error={flash.message == 'error_credentials' ? true : false}
                onchange={(e) => {setData("password", e.target.value)}}
            />
             <Input
                type='checkbox'
                label='Mostrar contraseña'
                name='showPàss'
                onchange={showPass}
            />
            <Button
                className='btn-normal'
                text='Iniciar sesión'
                width='50%'
                disable={processing}
                loading={processing}
            />

            <p>¿No tienes cuenta? <Link href={route('singInForm')}>Registrate</Link></p>
        </form>
    </div>
  )
}

export default Login
