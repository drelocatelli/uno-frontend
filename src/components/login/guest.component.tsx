import { useEffect } from 'react';
import Authentication from '../../services/auth';
import './guest.scss';
import { TabFx } from './login.animation';

function Guest() {

    useEffect(() => {
        TabFx('.content__guest');
    }, []);

    function submitForm(e: React.MouseEvent) {
        const target = e.target as HTMLButtonElement;
        const formData = new FormData(target.form as HTMLFormElement);
        if(target.form?.checkValidity()) {
            handleLogin(formData);
        } else {
            const usernameErrorEl = document.querySelector('#usernameError') as HTMLSpanElement;
            const usernameIn = (target!.form![0] as HTMLInputElement);
            usernameErrorEl.innerHTML = usernameIn.validationMessage;
            console.log(usernameIn.validationMessage)

        }
        // if(target.name == 'enter') {

        // } else if(target.name == 'createRoom') {

        // }
        
    }

    function handleLogin(formData: FormData) {
        Authentication.authAsGuest({username: formData.get('username')!.toString()});
    }

    return(
        <>
            <div className="content__guest">
                <div className="left">
                    <h1>Escolha seu nick</h1>
                    <form onSubmit={(e) => e.preventDefault()} noValidate>
                        <input type="text" name="username" placeholder='Seu nick aqui' required/>
                        <span id="usernameError" className='errorInput'>&nbsp;</span>
                        <div className="buttons">
                            <button type='button' onClick={submitForm} name="enter">Entrar</button>
                            <button type='button' onClick={submitForm} name="createRoom">Criar sala</button>
                        </div>
                    </form>
                </div>
                <div className="right">
                    <img src="/assets/img/avatar_select.png" />
                </div>
            </div>   
        </>
    );
}

export default Guest;