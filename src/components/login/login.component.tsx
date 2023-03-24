import { useEffect } from 'react';
import { useState } from 'react';
import Guest from './guest.component';
import LoginFx from './login.animation';
import './login.scss';
import User from './user.component';

function Login() {
    const [login, setLogin] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            LoginFx();
        }
    }, [mounted]);
    
    return (
        <div id="app">
            <a href="/" className="logo">
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
                {login ? <User /> : <Guest />}
            </div>
        </div>
    );
}

export default Login;
