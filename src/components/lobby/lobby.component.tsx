import Validate from './validate.component';
import './lobby.scss';
import RoomCard from './roomCard.component';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
function Lobby() {
    return (
        <Validate>
            <a href="/" className="logo showFx" style={{ marginBottom: '10px', zIndex: '1' }}>
                <img src="/assets/img/logo.png" />
            </a>
            <div className="lobby showFx">
                <Header />
                <div className="outer">
                    <Rooms />
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
    
    return (
        <div className="rooms">
            {Array.from(Array(15), (e, i) => (
                <RoomCard key={i} id={i.toString()} title="Sala02LimiteCaract" count="4/4" user="user" disabled={i % 2 == 0} />
            ))}
        </div>
    );
}

export default Lobby;
