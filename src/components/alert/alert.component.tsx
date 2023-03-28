import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../store/alert/alertReducer';
import { IRootState } from '../../store/store';
import AlertFx, { AlertCloseFx } from './alert.animation';
import './alert.scss';

function Alert() {
    const {alert} = useSelector(state => state) as IRootState;
    const dispatch = useDispatch();

    useEffect(() => {
        if(alert.isActive) {
            AlertFx();
        }
    }, [alert]);
    
    useEffect(() => {
        if(!alert.isActive) {
            AlertCloseFx();
        }
        if(alert.temporary) {
            setTimeout(() => {
                dispatch(alertActions.closeModal());
            }, 5000)
        }
    }, [alert])
    
    function toggleAlert() {
        dispatch(alertActions.closeModal());
    }
    
    return(
        <div className="alert" onClick={toggleAlert} data-temporary={alert.temporary}>
            {alert.message}
        </div>
    );
}

export default Alert;