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
            if(alert.withSound) {
                console.log(alert)
                new Audio('/assets/audio/UI_Quirky7.mp3').play();
            }
            AlertFx();
        }
        // reset alert sound FX
        dispatch(alertActions.reset());        
    }, [alert]);

    
    useEffect(() => {
        if(!alert.isActive) {
            AlertCloseFx();
        }
        // if(alert.temporary) {
            // setTimeout(() => {
                // dispatch(alertActions.closeModal());
            // }, 5000)
        // }
    }, [alert])
    
    function toggleAlert() {
        new Audio('/assets/audio/Whip_2.mp3').play();
        dispatch(alertActions.closeModal());
    }
    
    return(
        <div className="alert" style={{display: alert.isActive ? 'block': 'none'}} onClick={toggleAlert} data-temporary={alert.temporary}>
            {alert.message}
        </div>
    );
}

export default Alert;