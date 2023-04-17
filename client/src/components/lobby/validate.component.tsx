import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../services/user';
import { IRootState } from '../../store/store';
import { ColorfulLoading } from '../loading/loading.component';
import CardsMoveSVG from '/assets/img/loading/cardsmove.svg'; 
import './basic.scss';
import { sleep } from '../basics/sleep';

function Validate(props: PropsWithChildren) {
    const { auth: authState } = useSelector((state) => state) as IRootState;
    const { children } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        checkAuthenticated();
    }, []);
    
    async function checkAuthenticated() {
        document.body.classList.remove('animated');
        await sleep(1500);
        dispatch(
            UserService.validate(() => {
                window.location.href = '/';
            }) as any,
        );

    }

    if (authState.st == 'finished' && authState.authenticated) {
        return <>{children}</>;
    }

    return (
        <div id="app">
            <object data={CardsMoveSVG} width="180px" />
        </div>
    );
}

export default Validate;
