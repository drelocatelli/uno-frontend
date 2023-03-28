import { User } from "./auth.type";
import { instance } from "./instance";

class Authentication {
    
    static async authAsGuest(user: User) {
        try {
            const avatarSeed = await this.getAvatarSeed();
            const login = await instance.post('authentication/login', {...user, avatarSeed: avatarSeed.data.seed});
            console.log(login)
        } catch(err) {
            console.log(err)
        }
    }

    static getAvatarSeed() {
        return instance.get('avatars');
    }
    
}

export default Authentication;