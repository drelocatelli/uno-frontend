import RoomCard from '../components/roomCard';
import { alertActions } from '../../../../store/alert/alertReducer';
import {FormEvent, memo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store/store';

const Rooms = memo(() => {
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
});

export default Rooms;