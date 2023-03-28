import { useEffect } from "react";
import { LoadingFX } from "./loading.animation";

function ColorfulLoading() {

    useEffect(() => {
        LoadingFX();
    }, [])
    
    return (  <div className="loadingio-spinner-cube-6swp5biih6b"><div className="ldio-5xgl83h588">
    <div></div><div></div><div></div><div></div>
    </div></div>);
}

function PulseLoading() {
    return(<div className="lds-ripple"><div></div><div></div></div>);
}

export {ColorfulLoading, PulseLoading};