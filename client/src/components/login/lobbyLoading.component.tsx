import { ColorfulLoading } from "../loading/loading.component";
import CardsMoveSVG from '/assets/img/loading/cardsmove.svg'; 
import DistributeCardsSVG from '/assets/img/loading/distributecards.svg'; 

function LobbyLoading() {
    return (
        <div style={{ transform: 'translateY(50%)', textAlign: 'center', scale: '.6' }}>
            {/* <object data={DistributeCardsSVG} width="450px" /> */}
            <object data={CardsMoveSVG} width="230px" />
            <h1 style={{ color: '#fff', position: 'relative', top: '2rem', userSelect: 'none' }}>Aguardando entrada no lobby...</h1>
        </div>
    );
}

export default LobbyLoading;
