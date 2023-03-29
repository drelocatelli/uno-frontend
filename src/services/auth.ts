import { Dispatch } from "@reduxjs/toolkit";
import { sleep } from "../components/basics/sleep";
import { alertActions } from "../store/alert/alertReducer";
import { loginActions } from "../store/login/loginReducer";
import { Guest, User } from "./auth.type";
import { instance } from "./instance";

class Authentication {
    
    static authAsGuest(user: Guest) {
        return async (dispatch: Dispatch) => {
            dispatch(loginActions.setType({type: 'loading'}));

            try {
                await sleep(5000);
                const avatarSeed = await this.getAvatarSeed();
                await instance.post(
                    'authentication/register', 
                    {...user, avatarSeed: avatarSeed.data.seed}, 
                );
                
                dispatch(loginActions.setType({type: 'ok'}));
            } catch(err) {
                console.log(err)
                dispatch(loginActions.setType({type: 'error'}));
                dispatch(alertActions.setModal({isActive: true, temporary: true, message: 'Ocorreu um erro inesperado, tente novamente'}));
            }
        }
    }

    static authAsUser(user: User, path: 'login' | 'register') {
        return async (dispatch: Dispatch) => {
            dispatch(loginActions.setType({type: 'loading'}));
            try {
                await sleep(5000);
                const avatarSeed = await this.getAvatarSeed();
                await instance.post(
                    path == 'login' ? 'authentication/login' : 'authentication/register', 
                    {...user, avatarSeed: avatarSeed.data.seed}, 
                );
                
                dispatch(loginActions.setType({type: 'ok'}));
            } catch(err) {
                dispatch(loginActions.setType({type: 'error'}));
                dispatch(alertActions.setModal({isActive: true, temporary: true, message: 'Ocorreu um erro inesperado, tente novamente'}));
            }

        };
    }

    static getAvatarSeed() {
        return instance.get('avatars');
    }
    
}

export default Authentication;