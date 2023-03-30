import './loading.scss';

function ColorfulLoading({ size }: { size?: string }) {
    return (
        <div className="loadingio-spinner-cube-6swp5biih6b" style={{ scale: size ?? '1' }}>
            <div className="ldio-5xgl83h588">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

function BoxLoading() {
    return (
        <div className="boxLoading">
            <div className="planeLoading"></div>
        </div>
    );
}

function PulseLoading() {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
}

function GooeyRingLoading({size}: {size?: string}) {
    return <img src='/assets/img/loading/loading.svg' style={{userSelect: 'none', scale: size ?? '1'}} draggable={false}/>;
}

export { ColorfulLoading, PulseLoading, BoxLoading, GooeyRingLoading };
