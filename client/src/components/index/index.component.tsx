import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user";
import { IRootState } from "../../store/store";
import { GooeyRingLoading } from "../loading/loading.component";
import Login from "../login/login.component";
import { IndexFX, IndexFXEnd, RepelFX } from "./index.animation";
import './index.scss';
import AnimationLoading from "../loading/animation.component";
import DistributeCardsSVG from '/assets/img/loading/distributecards.svg'; 


function Index() {
    const dispatch = useDispatch();
    const {auth: authState, login: loginState} = useSelector(state => state) as IRootState;
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('animated');
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
        if(authState.st == 'finished') {
            IndexFXEnd();
            RepelFX('.logo img');
        }
    }, [authState])

    useEffect(() => {
        if(authState.authenticated) {
            navigate('/lobby');
        }
    }, [authState.authenticated])

    return(
        <AnimationLoading isLoading={authState.st != 'finished' || loginState.type == 'loading'}>
            <div id="app">
            <a href="/" className="logo" style={{marginBottom: '10px', zIndex: '1'}}>
                    <img src="/assets/img/logo.png" />
                </a>
                <div className="initialLoading" style={{opacity: '0'}}>
                    <object data={DistributeCardsSVG} width={'250px'} />
                    {/* <GooeyRingLoading size=".8" /> */}
                </div>
                {(!authState.authenticated && authState.st == 'finished') && (
                    <Login />
                )}
            </div>
        </AnimationLoading>
    );
}

export default Index;