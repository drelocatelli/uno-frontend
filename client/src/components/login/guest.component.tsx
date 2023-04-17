import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Authentication from '../../services/auth';
import formValidation from '../basics/formValidation.component';
import style from './guest.module.scss';
import { TabFx } from './login.animation';
import Avatar from './avatar.component';

function Guest() {
    const dispatch = useDispatch();

    useEffect(() => {
        TabFx('.content__guest');
    }, []);

    function submitForm(e: React.MouseEvent) {
        const target = e.target as HTMLButtonElement;
        new Audio('/assets/audio/UI_Quirky21.mp3').play();

        if (target.form?.checkValidity()) {
            handleLogin(new FormData(target.form as HTMLFormElement));
        } else {
            formValidation(target.form!.elements);
        }
        // if(target.name == 'enter') {

        // } else if(target.name == 'createRoom') {

        // }
    }

    function handleLogin(formData: FormData) {
        dispatch(Authentication.authAsGuest({ username: formData.get('username')!.toString() }) as any);
    }

    return (
        <> 
            <div className={`${style.content__guest} content__guest`}>
                <div className={style.left}>
                    <h1>Escolha seu nick</h1>
                    <form onSubmit={(e) => e.preventDefault()} noValidate>
                        <input type="text" name="username" placeholder="Seu nick aqui" required />
                        <span id="usernameError" className="errorInput">
                            &nbsp;
                        </span>
                        <div className="buttons">
                            <button type="button" onClick={submitForm} name="enter">
                                Entrar
                            </button>
                            <button type="button" onClick={submitForm} name="createRoom">
                                Criar sala
                            </button>
                        </div>
                    </form>
                </div>
                <div className={style.right}>
                    <Avatar />
                </div>
            </div>
        </>
    );
}

export default Guest;
