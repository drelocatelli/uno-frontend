import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { authActions } from '../../store/auth/authReducer';
import { sleep } from '../basics/sleep';
import Authentication from "../../services/auth";
import { ColorfulLoading } from "../loading/loading.component";

function Avatar() {
    const dispatch = useDispatch();
    const { auth: authState } = useSelector((state) => state) as IRootState;
    const isLoadingAvatar = authState.avatarSeed.isLoading && authState.avatarSeed.seed != null;

    function selectAvatar() {
        new Audio('/assets/audio/Whip_2.mp3').play();
        dispatch(Authentication.getAvatarSeed() as any);
    }

    const loadAvatar = async () => {
        await sleep(2000);
        dispatch(authActions.setAvatarSeedLoading(false));
    };

    return (
        <div className="login__avatar">
            <div className="avatar-profile">
                {authState.avatarSeed.seed != null ? (
                    <>
                        {isLoadingAvatar && (
                            <ColorfulLoading />
                        )}
                        <img
                            onLoad={loadAvatar}
                            style={{ transition: 'opacity .5s ease-out', display: isLoadingAvatar ? 'none': 'block' }}
                            src={authState.avatarSeed.seed}
                        />
                    </>
                ) : (
                    <>Ocorreu um erro</>
                )}
            </div>
            <img
                className={`reload-icon ${isLoadingAvatar ? 'rotate' : ''}`}
                onClick={() => (isLoadingAvatar ? null : selectAvatar())}
                src="/assets/img/reload.png"
                draggable={false}
            />
        </div>
    );
}

export default Avatar;
