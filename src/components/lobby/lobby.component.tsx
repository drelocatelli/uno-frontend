import Validate from './validate.component';
import './lobby.scss';
import RoomCard from './roomCard.component';
import { FormEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/alert/alertReducer';
import { waitComponent } from '../../utils/waitComponent';
import { LobbyFx } from './lobby.animation';

function Lobby() {
    const lobbyRef = useRef<null | HTMLDivElement>(null);
    
    useEffect(() => {
        waitComponent(lobbyRef, () => {
            LobbyFx();
        });
    }, [])

    return (
        <Validate>
            <div id="app">
                <div ref={lobbyRef} className="lobby-container">
                    <div className="first-header">
                        <div className='first-header-content'>
                            <div className="checkbox">
                                <input type="checkbox" name="roomFull" id="roomFull" />
                                <label htmlFor="roomFull">Mostrar salas cheias</label>
                            </div>
                        </div>
                        <a href="/lobby" className="logo showFx" style={{ marginBottom: '10px', zIndex: '1' }}>
                            <img src="/assets/img/logo.png" />
                        </a>
                        <div className='first-header-content'>
                            <img src="/assets/img/user-example.png" />
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
    const dispatch = useDispatch();

    function selectRoom(e: FormEvent) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const roomSelected = new FormData(target).get('room');
        if(roomSelected == null) {
            dispatch(alertActions.setModal({isActive: true, temporary: true, message: 'Você deve escolher uma sala primeiro!'}));
        } else {
            const audio = new Audio('/assets/audio/draw.mp3');
            audio.play();
            dispatch(alertActions.setModal({isActive: true, temporary: true, withSound: false, message: `Sala selecionada: ${roomSelected}`}));
        }
    }

    return (
        <>
            <form onSubmit={selectRoom}>
                <div className="rooms">
                    {Array.from(Array(15), (e, i) => (
                        <RoomCard key={i} id={i.toString()} title="Sala02LimiteCaract" count="4/4" user="user" disabled={i % 2 == 0} />
                    ))}
                </div>
                <div className="controls">
                    <button type="submit" style={{padding: '.8rem 5rem'}}>Entrar</button>
                    <div className='pagination'>
                        <img src="/assets/img/arrow_left.png" />
                        <div className="page">1 / 20</div>
                        <img src="/assets/img/arrow_left.png" style={{rotate: '180deg'}} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default Lobby;
