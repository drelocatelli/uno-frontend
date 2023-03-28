import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/alert/alertReducer';
import { IRootState } from '../../store/store';
import Guest from './guest.component';
import LoginFx from './login.animation';
import './login.scss';
import User from './user.component';

function Login() {
    const [login, setLogin] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {login: loginState} = useSelector(state => state) as IRootState;

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            LoginFx();
        }
    }, [mounted]);
    
    function easterEgg() {
        dispatch(alertActions.setModal({message: 'Olá mundo!', isActive: true, temporary: true}))
    }
    
    return (
        <div id="app">
            <a href="javascript:void(0);" className="logo" onClick={easterEgg}>
                <img src="/assets/img/logo.png" />
            </a>
            <div className="container">
                <div className="tabs">
                    <div className={`tab ${!login && 'active'}`} onClick={() => setLogin(false)}>
                        Convidado
                    </div>
                    <div className={`tab ${login && 'active'}`} onClick={() => setLogin(true)}>
                        Fazer Login
                    </div>
                </div>
                {loginState.type == 'initial' ? (
                    <>
                        {login ? <User /> : <Guest />}
                    </>
                ): null}
            </div>
        </div>
    );
}

export default Login;
