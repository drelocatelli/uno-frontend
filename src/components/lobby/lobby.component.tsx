import Validate from './validate.component';
import './lobby.scss';
import RoomCard from './roomCard.component';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/alert/alertReducer';
import { waitComponent } from '../../utils/waitComponent';
import { LobbyFx } from './lobby.animation';
import { IRootState } from '../../store/store';
import { formActions } from '../../store/forms/formReducer';

function Lobby() {
    const dispatch = useDispatch();
    const lobbyRef = useRef<null | HTMLDivElement>(null);
    const { form: formState, auth: authState } = useSelector((state) => state) as IRootState;

    useEffect(() => {
        waitComponent(lobbyRef, () => {
            LobbyFx();
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
                                    {authState.avatarSeed != null ? (
                                        <img src={authState.avatarSeed} />
                                    ) : (
                                        <img src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=36315" />
                                    )}
                                </div>
                                <div className="profile-name">
                                    #userloggedIn
                                </div>
                                <div className="menu">
                                    <img src="/assets/img/arrow_down.png" draggable={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lobby showFx">
                        <Header />
                        <div className="outer">
                            <Rooms />
                        </div>
                    </div>
                </div>
            </div>
        </Validate>
    );
}

function Header() {
    return (
        <div className="header">
            <div className="search">
                <div className="icon-input">
                    <label htmlFor="search">
                        <i className="fas fa-search"></i>
                    </label>
                    <input type="text" id="search" name="search" placeholder="Pesquisar" />
                </div>
            </div>

            <div className="title">
                <h1>Salas</h1>
                <p>123 Salas criadas</p>
            </div>

            <div>
                <button type="button">
                    <i className="fas fa-plus"></i>
                    &nbsp; Nova sala
                </button>
            </div>
        </div>
    );
}

function Rooms() {
    const { form: formState } = useSelector((state) => state) as IRootState;
    const dispatch = useDispatch();

    function selectRoom(e: FormEvent) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const roomSelected = new FormData(target).get('room');
        if (roomSelected == null) {
            dispatch(alertActions.setModal({ isActive: true, temporary: true, message: 'Você deve escolher uma sala primeiro!' }));
        } else {
            const audio = new Audio('/assets/audio/draw.mp3');
            audio.play();
            dispatch(alertActions.setModal({ isActive: true, temporary: true, withSound: false, message: `Sala selecionada: ${roomSelected}` }));
        }
    }

    return (
        <>
            <form onSubmit={selectRoom}>
                <div className="rooms">
                    {Array.from(Array(15), (e, i) => {
                        const disabled = i % 2 == 0;
                        const randomUserNumber = Math.floor(Math.random() * 3) + 1;
                        if (formState.showFullRooms && disabled) {
                            return <RoomCard key={i} id={i.toString()} title="Sala02LimiteCaract" count="4/4" user="user" disabled={disabled} />;
                        } else {
                            return (
                                <RoomCard
                                    key={i}
                                    id={i.toString()}
                                    title="Sala02LimiteCaract"
                                    count={`${randomUserNumber}/4`}
                                    user="user"
                                    disabled={false}
                                />
                            );
                        }
                    })}
                </div>
                <div className="controls">
                    <button type="submit" style={{ padding: '.8rem 5rem' }}>
                        Entrar
                    </button>
                    <div className="pagination">
                        <img src="/assets/img/arrow_left.png" />
                        <div className="page">1 / 20</div>
                        <img src="/assets/img/arrow_left.png" style={{ rotate: '180deg' }} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default Lobby;
