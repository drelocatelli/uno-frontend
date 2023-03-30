function RoomCard(props: { id: string; title: string; user: string; count: string; disabled?: boolean }) {
    return (
        <label className="card-label" htmlFor={`${props.id}_radio`}>
            <input type="radio" id={`${props.id}_radio`} className="roomRadio" name="room" value={props.id} disabled={props.disabled ?? false} />
            <div id={props.id} className={`card ${props.disabled ? 'disabled' : ''}`}>
                <b>{props.title}</b>
                <div className="user">#{props.user}</div>
                <div className="users-count">
                    <i className="fa-regular fa-user"></i>
                    <span>{props.count}</span>
                </div>
            </div>
        </label>
    );
}

export default RoomCard;
