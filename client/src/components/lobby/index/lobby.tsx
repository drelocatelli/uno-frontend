import Validate from '../validate.component';
import './lobby.scss';
import { ChangeEvent,  useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { waitComponent } from '../../../utils/waitComponent';
import { LobbyFx } from './lobby.animation';
import { IRootState } from '../../../store/store';
import { formActions } from '../../../store/forms/formReducer';
import UserMenu from './components/userMenu';
import LobbyHeader from './components/lobbyHeader';
import Rooms from './components/rooms';
import { RepelFX } from '../../index/index.animation';

function Lobby() {
    const dispatch = useDispatch();
    const lobbyRef = useRef<null | HTMLDivElement>(null);
    const { form: formState, auth: authState } = useSelector((state) => state) as IRootState;

    useEffect(() => {
        waitComponent(lobbyRef, () => {
            LobbyFx();
            RepelFX('.logo img');
        });
    }, []);

    function toggleFullRooms(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        dispatch(formActions.setShowFullRooms(target.checked));
    }

    return (
        <Validate>
            <div id="app">
                <div ref={lobbyRef} className="lobby-container">
                    <div className="first-header">
                        <div className="first-header-content">
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="roomFull"
                                    id="roomFull"
                                    defaultChecked={formState.showFullRooms}
                                    onChange={toggleFullRooms}
                                />
                                <label htmlFor="roomFull">Mostrar salas cheias</label>
                            </div>
                        </div>
                        <a href="/lobby" className="logo showFx" style={{ marginBottom: '10px', zIndex: '1' }}>
                            <img src="/assets/img/logo.png" />
                        </a>
                        <div className="first-header-content">
                            <div className="user-profile-menu">
                                <div className="profile-photo">
                                    {authState.avatarSeed.seed != null ? (
                                        <img src={authState.avatarSeed.seed} />
                                    ) : (
                                        <img src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=36315" />
                                    )}
                                </div>
                                <div className="profile-name">#userloggedIn</div>
                                <UserMenu />
                            </div>
                        </div>
                    </div>
                    <div className="lobby showFx">
                        <LobbyHeader />
                        <div className="outer">
                            <Rooms />
                        </div>
                    </div>
                </div>
            </div>
        </Validate>
    );
}

export default Lobby;
