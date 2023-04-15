import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '../../services/auth';
import { IRootState } from '../../store/store';
import formValidation from '../basics/formValidation.component';
import './guest.scss';
import { TabFx } from './login.animation';
import { authActions } from '../../store/auth/authReducer';
import { sleep } from '../basics/sleep';

function Guest() {
    const { auth: authState } = useSelector((state) => state) as IRootState;
    const dispatch = useDispatch();

    const isLoadingAvatar = authState.avatarSeed.isLoading && authState.avatarSeed.seed != null;

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

    function selectAvatar() {
        new Audio('/assets/audio/Whip_2.mp3').play();
        dispatch(Authentication.getAvatarSeed() as any);
    }

    function handleLogin(formData: FormData) {
        dispatch(Authentication.authAsGuest({ username: formData.get('username')!.toString() }) as any);
    }

    const loadAvatar = async () => {
        await sleep(2000);
        dispatch(authActions.setAvatarSeedLoading(false));
    };

    return (
        <>
            <div className="content__guest">
                <div className="left">
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
                <div className="right">
                    <div className="login__avatar">
                        <div className="avatar-profile">
                            {authState.avatarSeed.seed != null ? (
                                <img onLoad={loadAvatar} css={isLoadingAvatar ? { filter: 'grayscale(1)', opacity: '.1' } : {}} src={authState.avatarSeed.seed} />
                            ) : (
                                <>Ocorreu um erro</>
                            )}
                        </div>
                        <img
                            className={`reload-icon ${isLoadingAvatar ? 'rotate' : ''}`}
                            onClick={() => (isLoadingAvatar ? null : selectAvatar())}
                            src="/assets/img/reload.png"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Guest;
