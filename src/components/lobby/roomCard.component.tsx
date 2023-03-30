function RoomCard(props: {title: string, user: string, count: string, disabled?: boolean}) {
    return (
        <div className={`card ${props.disabled ? 'disabled' : ''}`}>
            <b>{props.title}</b>
            <div className="user">#{props.user}</div>
            <div className="users-count">
                <i className="fa-regular fa-user"></i>
                <span>{props.count}</span>
            </div>
        </div>
    );
}

export default RoomCard;
