import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user";
import { IRootState } from "../../store/store";
import { ColorfulLoading } from "../loading/loading.component";
import Login from "../login/login.component";
import { IndexFX } from "./index.animation";
import './index.scss';

function Index() {
    const dispatch = useDispatch();
    const {auth: authState} = useSelector(state => state) as IRootState;
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!animationFinished) {
            IndexFX(() => setAnimationFinished(true));
        }
    }, []);
    
    useEffect(() => {
        if(animationFinished) {
            dispatch(UserService.validate() as any);
        }
    }, [animationFinished]);

    useEffect(() => {
        if(authState.authenticated) {
            navigate('/lobby');
        }
    }, [authState.authenticated])

    return(
        <div id="app">
           <a href="/" className="logo" style={{marginBottom: '10px'}}>
                <img src="/assets/img/logo.png" />
            </a>
            {!authState.authenticated && authState.st == 'initial' && (
                <div className="initialLoading" style={{opacity: '0', scale: '.5'}}>
                    <ColorfulLoading />
                </div>
            )}
            {(!authState.authenticated && authState.st == 'finished') && (
                <Login />
            )}
        </div>
    );
}

export default Index;