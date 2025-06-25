import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React, { use, useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import AlertError from '../../components/alerts/AlertError/AlertError';

function SingIn() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const { flash } = usePage().props;

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordText, setPasswordText] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false)

    // Monitoriza cada que las passwords son diferentes sin utilizar eventos

    useEffect(() => {
        setPasswordMatch(data.password == data.passwordConfirm);
    }, [data.password, data.passwordConfirm]);

    function submit(e) {
        e.preventDefault();
        post(route('singIn'));
    }

    function showPass(e)
    {
        setPasswordText(e.target.checked);
    }

    function evaluatePassword(e, value)
    {
        let score = 0;

        if(e.target.value.length >= 10) {
            score += 2;
            // console.log('10 caracteres o mas');
        }

        if(/[A-Z]/.test(e.target.value)) {
            score++;
            // console.log('Tiene de la A a la Z');
        }

        if(/[a-z]/.test(e.target.value)) {
            score++;
            // console.log('Tiene de la a a la z');
        }

        if(/[0-9]/.test(e.target.value)) {
            score++;
            // console.log('Tiene de la 0 a 9');
        }

        if(/[^A-Za-z0-9]/.test(e.target.value)) {
            score += 2;
            // console.log('Tiene caracteres especiales');
        }

        if( e.target.value.length >= 12) {
            score += 3;
            // console.log('Tiene mas de 12 caracteres');
        }

        if(score <= 4) {
            value == 1 ? setPassword1('slowInput') : setPassword2('slowInput')
        }

        if(score <= 9 && score > 4) {
            value == 1 ? setPassword1('halfInput') : setPassword2('halfInput');
        }

        if(score <= 10 && score > 9) {
            value == 1 ? setPassword1('secure') : setPassword2('secure');
        }
    }

  return (
    <div className='content_login'>
        <Head>
            <title>SingIn</title>
        </Head>

        {flash.message == 'email_already_exist' &&
            <AlertError message={'El correo ya esta registrado en myDiary'} />
        }

        <form onSubmit={submit}>
            <img src='/assets/img/usuario.png' alt=''/>
            <Input
                type={'name'}
                label={'Nombre Completo'}
                name={'name'}
                required={true}
                onchange={(e) => {setData("name", e.target.value)}}
            />
            {errors.body && <p className='error'>{errors.body}</p>}
            <Input
                type={'email'}
                label={'Correo'}
                name={'email'}
                required={true}
                error={flash.message == 'email_already_exist' ? true : false}
                onchange={(e) => setData("email", e.target.value)}
            />
            {errors.body && <p className='error'>{errors.body}</p>}

            <Input
                type={passwordText ? 'text' : 'password'}
                label={`${'Contraseña'} ${password1 == 'slowInput' ? '(Poco segura)' : ''} ${password1 == 'halfInput' ? '(Nivel medio)' : ''} ${password1 == 'secure' ? '(Segura)' : ''}`}
                name={'password'}
                required={true}
                onchange={(e) => setData("password", e.target.value)}
                onkeyup={(e) => evaluatePassword(e, '1')}
                className={password1}
            />
            {errors.body && <p className='error'>{errors.body}</p>}

            <Input
                type={passwordText ? 'text' : 'password'}
                label={`${'Confirma contraseña'} ${password2 == 'slowInput' ? '(Poco segura)' : ''} ${password2 == 'halfInput' ? '(Nivel medio)' : ''} ${password2 == 'secure' ? '(Segura)' : ''}`}
                name={'password_confirm'}
                required={true}
                onchange={(e) => setData("passwordConfirm", e.target.value)}
                onkeyup={(e) => evaluatePassword(e, '2')}
                className={password2}
            />
            {errors.body && <p className='error'>{errors.body}</p>}

            {!passwordMatch && <label className='label_error'>Las contraseña no son Iguales</label> }

            <Input
                type='checkbox'
                label='Mostrar contraseñas'
                name='showPàss'
                onchange={showPass}
            />

            <Button
                className={'btn-normal'}
                text={'Crear cuenta'}
                width='50%'
                disabled={processing}
                loading={processing}
            />
            <p>¿Ya tienes cuenta? <Link href={route('loginForm')}>Inicia sesion</Link></p>
        </form>
    </div>
  )
}

export default SingIn
