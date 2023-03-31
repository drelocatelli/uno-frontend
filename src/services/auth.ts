import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { sleep } from '../components/basics/sleep';
import { alertActions } from '../store/alert/alertReducer';
import { authActions } from '../store/auth/authReducer';
import { loginActions } from '../store/login/loginReducer';
import store, { IRootState } from '../store/store';
import CustomError from '../utils/customError';
import { Guest, User } from './auth.type';
import { instance } from './instance';

class Authentication {
    static authAsGuest(user: Guest) {
        return async (dispatch: Dispatch) => {
            dispatch(loginActions.setType({ type: 'loading' }));
            const { auth: authState } = store.getState() as any as IRootState;
            try {
                await sleep(5000);
                if (authState.avatarSeed != null && authState.avatarSeed != 'loading') {
                    const getSeed = parseInt(authState.avatarSeed.split('seed=')[1]);
                    const response = await instance.post('authentication/register', { ...user, avatarSeed: getSeed });

                    dispatch(loginActions.setType({ type: 'ok' }));
                } else {
                    throw new CustomError('Selecione um avatar');
                }
            } catch (err) {
                console.log(err);
                dispatch(loginActions.setType({ type: 'error' }));
                if(err instanceof CustomError) {
                    return dispatch(alertActions.setModal({ isActive: true, temporary: true, message: err.message }));
                }
                dispatch(alertActions.setModal({ isActive: true, temporary: true, message: 'Ocorreu um erro inesperado, tente novamente' }));
            }
        };
    }

    static authAsUser(user: User, path: 'login' | 'register') {
        return async (dispatch: Dispatch) => {
            dispatch(loginActions.setType({ type: 'loading' }));
            const { auth: authState } = store.getState() as any as IRootState;

            try {
                await sleep(5000);
                if (authState.avatarSeed != null && authState.avatarSeed != 'loading' || path == 'login') {
                    const getSeed = parseInt(authState?.avatarSeed?.split('seed=')[1] ?? "1");

                    await instance.post(path == 'login' ? 'authentication/login' : 'authentication/register', { ...user, avatarSeed: getSeed });

                    dispatch(loginActions.setType({ type: 'ok' }));
                } else {
                    throw new CustomError('Selecione um avatar');
                }
            } catch (err) {
                let error = err as AxiosError;
                console.log(error);
                dispatch(loginActions.setType({ type: 'error' }));
                if(err instanceof CustomError) {
                    return dispatch(alertActions.setModal({ isActive: true, temporary: true, message: err.message }));
                }
                if (error.response?.status == 400) {
                    dispatch(alertActions.setModal({ isActive: true, temporary: true, message: 'E-mail e senha não conferem' }));
                } else {
                    dispatch(alertActions.setModal({ isActive: true, temporary: true, message: 'Ocorreu um erro inesperado, tente novamente' }));
                }
            }
        };
    }

    static getAvatarSeed() {
        return async (dispatch: Dispatch) => {
            dispatch(authActions.setAvatarSeed('loading'));
            try {
                const response = await instance.get('avatars');
                const data = response.data as { seed: number; url: string };
                dispatch(authActions.setAvatarSeed(data.url));

            } catch (err) {
                dispatch(authActions.setAvatarSeed(null));
                dispatch(alertActions.setModal({ isActive: true, temporary: true, message: 'Não foi possível obter avatar' }));

                console.log(err);
            }
        };
    }
}

export default Authentication;
