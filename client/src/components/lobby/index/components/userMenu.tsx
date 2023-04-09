import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../../../services/auth';

function UserMenu() {
    const navigate = useNavigate();
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

    const userMenuProps = (): React.CSSProperties => {
        return userMenuOpen
            ? {
                  opacity: 1,
                  pointerEvents: 'all',
              }
            : {
                  opacity: 0,
                  pointerEvents: 'none',
              };
    };

    const logout = async () => {
        try {
            await Authentication.logout();
            navigate(0);
        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro inesperado');
        }
    };

    return (
        <div className="menu" onClick={() => setUserMenuOpen((state) => !state)}>
            <img src="/assets/img/arrow_down.png" draggable={false} />
            <div className="menu-widget" style={userMenuProps()}>
                <li id="changeUserBtn">Trocar usuário</li>
                <li onClick={logout} id="logoutBtn">
                    <i className="fas fa-sign-out-alt"></i> &nbsp; Sair
                </li>
            </div>
        </div>
    );
}

export default UserMenu;
