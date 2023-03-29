import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TabFx } from './login.animation';
import './user.scss';

function User() {
    const dispatch = useDispatch();

    useEffect(() => {
        TabFx('.content__user');
    }, []);

    function submitForm(e: React.MouseEvent) {
        const target = e.target as HTMLButtonElement;
        const formData = new FormData(target.form as HTMLFormElement);
    }
    
    function handleLogin(formData: FormData) {

    }

    return(
        <>
            <div className="content__user">
                <div className="left">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h3>Escolha seu nick</h3>
                        <input type="text" name="username" placeholder='Seu nick aqui' />
                        <h3>E-mail</h3>
                        <div className="icon-input">
                            <label htmlFor="email"><i className="fa-sharp fa-regular fa-envelope"></i></label>
                            <input type="text" id='email' name="email" placeholder='Digite seu e-mail' />
                        </div>
                        <h3>Senha</h3>
                        <div className="icon-input">
                            <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                            <input type="password" id='password' name="password" placeholder='******' />
                        </div>
                        <div className="buttons">
                            <button name="enter" onClick={submitForm}>Entrar</button>
                            <button name="createRoom" onClick={submitForm}>Criar sala</button>
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

export default User;