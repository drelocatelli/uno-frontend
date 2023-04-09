function LobbyHeader() {
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

export default LobbyHeader;