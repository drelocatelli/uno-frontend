import { Dispatch } from "@reduxjs/toolkit";
import { alertActions } from "../store/alert/alertReducer";
import { loginActions } from "../store/login/loginReducer";
import { User } from "./auth.type";
import { instance } from "./instance";

class Authentication {
    
    static authAsGuest(user: User) {
        return async (dispatch: Dispatch) => {
            dispatch(loginActions.setType({type: 'loading'}));

            try {
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

    static getAvatarSeed() {
        return instance.get('avatars');
    }
    
}

export default Authentication;