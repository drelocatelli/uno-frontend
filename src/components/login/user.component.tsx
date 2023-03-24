import { useEffect } from 'react';
import { TabFx } from './login.animation';
import './user.scss';

function User() {

    useEffect(() => {
        TabFx('.content__user');
    }, []);

    return(
        <>
            <div className="content__user">
                <div className="left">
                    <form>
                        <h3>Escolha seu nick</h3>
                        <input type="text" placeholder='Seu nick aqui' />
                        <h3>E-mail</h3>
                        <div className="icon-input">
                            <label htmlFor="email"><i className="fa-sharp fa-regular fa-envelope"></i></label>
                            <input type="text" id='email' placeholder='Digite seu e-mail' />
                        </div>
                        <h3>Senha</h3>
                        <div className="icon-input">
                            <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                            <input type="password" id='password' placeholder='******' />
                        </div>
                        <div className="buttons">
                            <button>Entrar</button>
                            <button>Criar sala</button>
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