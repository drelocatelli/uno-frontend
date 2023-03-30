import { Dispatch } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/authReducer";
import { instance } from "./instance";

class UserService {

    static validate() {
        return async (dispatch: Dispatch) => {
            try {
                await instance.get('profile');
                dispatch(authActions.setAuth({authenticated: true, st: 'finished'}));
            } catch(err) {
                console.log(err)
                dispatch(authActions.setAuth({authenticated: false, st: 'finished'}));
            }
        };
    }

}

export default UserService;