import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Authentication from '../../services/auth';
import formValidation from '../basics/formValidation.component';
import { TabFx } from './login.animation';
import styles from './user.module.scss';
import Avatar from './avatar.component';
import { css } from '@emotion/react';

function User() {
    const dispatch = useDispatch();
    const [register, setRegister] = useState<boolean>(false);

    useEffect(() => {
        TabFx('.content__user');
    }, []);

    function submitForm(e: React.MouseEvent) {
        const target = e.target as HTMLButtonElement;
        new Audio('/assets/audio/UI_Quirky21.mp3').play();
        if (target.name == 'createAccount') {
            setRegister(true);
            return;
        }
        if (target.form?.checkValidity()) {
            if (target.name == 'enter') {
                handleLogin(new FormData(target.form as HTMLFormElement), 'login');
            } else if (target.name == 'register') {
                handleLogin(new FormData(target.form as HTMLFormElement), 'register');
            }
        } else {
            formValidation(target.form!.elements);
        }
    }

    function handleLogin(formData: FormData, path: 'login' | 'register') {
        dispatch(
            Authentication.authAsUser(
                {
                    username: formData.get('username')?.toString(),
                    email: formData.get('email')!.toString(),
                    password: formData.get('password')!.toString(),
                },
                path,
            ) as any,
        );
    }

    

    return (
        <>
            <div className={`${styles.content__user} content__user`}>
                <div className={styles.left}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {register && (
                            <>
                                <h3>Escolha seu nick</h3>
                                <input type="text" name="username" placeholder="Seu nick aqui" required />
                                <span id="usernameError" className="errorInput"></span>
                            </>
                        )}
                        <h3>E-mail</h3>
                        <div className="icon-input">
                            <label htmlFor="email">
                                <i className="fa-sharp fa-regular fa-envelope"></i>
                            </label>
                            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required />
                        </div>
                        <h3>Senha</h3>
                        <div className="icon-input">
                            <label htmlFor="password">
                                <i className="fa-solid fa-lock"></i>
                            </label>
                            <input type="password" id="password" name="password" placeholder="******" required />
                        </div>
                        <div className="buttons">
                            {register ? (
                                <div css={{display: 'flex', flexGrow: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                                    <button type="button" name="register" onClick={submitForm}>
                                        Registrar
                                    </button>
                                    <a href="javascript:void(0);" onClick={() => setRegister(state => !state)} css={css`color: #fff; margin: 0 1rem;`}>Cancelar</a>
                                </div>
                            ) : (
                                <>
                                    <button type="button" name="enter" onClick={submitForm}>
                                        Entrar
                                    </button>
                                    <button type="button" name="createAccount" onClick={submitForm}>
                                        Registrar-se
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
                <div className={styles.right}>
                    <Avatar />
                </div>
            </div>
        </>
    );
}

export default User;
