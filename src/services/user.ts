import { Dispatch } from "@reduxjs/toolkit";
import { sleep } from "../components/basics/sleep";
import { authActions } from "../store/auth/authReducer";
import { instance } from "./instance";

class UserService {

    static validate(onFail?: Function) {
        return async (dispatch: Dispatch) => {
            try {
                await instance.get('profile');
                dispatch(authActions.setAuth({authenticated: true, st: 'finished'}));
            } catch(err) {
                console.log(err)
                dispatch(authActions.setAuth({authenticated: false, st: 'finished'}));
                if(onFail) 
                onFail();
            }
        };
    }

}

export default UserService;