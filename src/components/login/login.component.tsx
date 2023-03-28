import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/alert/alertReducer';
import { ILoginState } from '../../store/login/loginReducer';
import { IRootState } from '../../store/store';
import Guest from './guest.component';
import LoginFx from './login.animation';
import './login.scss';
import User from './user.component';

function Login() {
    const [login, setLogin] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {type: loginState} = useSelector((state: IRootState) => state.login) as ILoginState;

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
                {loginState == 'initial' || loginState == 'error' ? (
                    <>
                        {login ? <User /> : <Guest />}
                    </>
                ): loginState == 'loading' ? (
                    <>
                        Aguarde...
                    </>
                ): null}
            </div>
        </div>
    );
}

export default Login;
