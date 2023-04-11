import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../services/auth';
import { ILoginState } from '../../store/login/loginReducer';
import { IRootState } from '../../store/store';
import { ColorfulLoading } from '../loading/loading.component';
import Guest from './guest.component';
import LoginFx from './login.animation';
import './login.scss';
import User from './user.component';
import Contribution from './hooks/useContribution';
import useContribution from './hooks/useContribution';

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const { showing: showingContribution, handleContributionAnimation, contributionText } = useContribution();
    const dispatch = useDispatch();
    const { type: loginState } = useSelector((state: IRootState) => state.login) as ILoginState;

    useEffect(() => {
        if (!mounted) {
            LoginFx();
            dispatch(Authentication.getAvatarSeed() as any);
            setMounted(true);
        }
    }, [mounted]);

    useEffect(() => {
        if (loginState == 'ok') {
            navigate('/lobby');
        }
    }, [loginState]);

    return (
        <div className="entrypoint">
            {showingContribution ? (
                <div className="contribution" css={{fontSize: '8rem', userSelect: 'none', fontWeight: 'bold', color: '#000', textShadow: '3px 0px 1px #fff'}}>
                    {contributionText}
                </div>
            ) : (
                <div className="container">
                    <div className="tabs">
                        <div
                            className={`tab ${!login && 'active'}`}
                            onClick={() => {
                                new Audio('/assets/audio/flipcard1.mp3').play();
                                setLogin(false);
                            }}>
                            Convidado
                        </div>
                        <div
                            className={`tab ${login && 'active'}`}
                            onClick={() => {
                                new Audio('/assets/audio/flipcard1.mp3').play();
                                setLogin(true);
                            }}>
                            Fazer Login
                        </div>
                    </div>
                    {loginState == 'initial' || loginState == 'error' ? (
                        <>{login ? <User /> : <Guest />}</>
                    ) : (
                        loginState == 'loading' && (
                            <div style={{ transform: 'translateY(50%)', textAlign: 'center', scale: '.6' }}>
                                <ColorfulLoading />
                                <h1 style={{ color: '#fff', position: 'relative', top: '6rem', userSelect: 'none' }}>
                                    Aguardando entrada no lobby...
                                </h1>
                            </div>
                        )
                    )}
                    <div css={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <a href="#" css={{ color: '#fff', textShadow: '1px 0px 3px #000' }} onClick={handleContributionAnimation}>
                            [Contribuições]
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
