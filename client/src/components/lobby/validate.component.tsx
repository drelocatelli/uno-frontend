import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../services/user';
import { IRootState } from '../../store/store';
import { ColorfulLoading } from '../loading/loading.component';
import './basic.scss';

function Validate(props: PropsWithChildren) {
    const { auth: authState } = useSelector((state) => state) as IRootState;
    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.remove('animated');
        dispatch(
            UserService.validate(() => {
                window.location.href = '/';
            }) as any,
        );
    }, []);

    if(authState.st == 'finished' && authState.authenticated) {
        return(<>{children}</>)
    }

    return (
        <div id="app">
            <ColorfulLoading size=".8" />
        </div>
    );
}

export default Validate;
