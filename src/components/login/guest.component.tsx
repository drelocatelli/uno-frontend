import { useEffect } from 'react';
import './guest.scss';
import { TabFx } from './login.animation';

function Guest() {
    useEffect(() => {
        TabFx('.content__guest');
    }, []);

    return(
        <>
            <div className="content__guest">
                <div className="left">
                    <h1>Escolha seu nick</h1>
                    <form>
                        <input type="text" placeholder='Seu nick aqui' />
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

export default Guest;