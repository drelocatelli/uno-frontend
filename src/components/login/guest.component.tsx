import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '../../services/auth';
import { IRootState } from '../../store/store';
import formValidation from '../basics/formValidation.component';
import { ColorfulLoading } from '../loading/loading.component';
import './guest.scss';
import { TabFx } from './login.animation';

function Guest() {
    const {auth: authState} = useSelector(state => state) as IRootState;
    const dispatch = useDispatch();

    useEffect(() => {
        TabFx('.content__guest');
    }, []);

    function submitForm(e: React.MouseEvent) {
        const target = e.target as HTMLButtonElement;
        new Audio('/assets/audio/UI_Quirky21.mp3').play();

        if(target.form?.checkValidity()) {
            handleLogin(new FormData(target.form as HTMLFormElement));
        } else {
            formValidation(target.form!.elements);
        }
        // if(target.name == 'enter') {

        // } else if(target.name == 'createRoom') {

        // }
        
    }

    function selectAvatar() {
        new Audio('/assets/audio/Whip_2.mp3').play();
        dispatch(Authentication.getAvatarSeed() as any);
    }

    function handleLogin(formData: FormData) {
        dispatch(Authentication.authAsGuest({username: formData.get('username')!.toString()}) as any);
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
                    <div className="login__avatar">
                        <div className="avatar-profile">
                            {authState.avatarSeed != null ? (
                                <>
                                    {authState.avatarSeed == 'loading' ? (
                                        <ColorfulLoading />
                                    ) : (
                                        <img src={authState.avatarSeed} />
                                    )}
                                </>
                            ) : (
                                <>
                                    Ocorreu um erro
                                </>
                            )}
                        </div>
                        <img className='reload-icon' onClick={selectAvatar} src="/assets/img/reload.png" draggable={false} />
                    </div>
                    {/* <img src="/assets/img/avatar_select.png" /> */}
                </div>
            </div>   
        </>
    );
}

export default Guest;