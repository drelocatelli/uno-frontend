import {gsap} from 'gsap';

export default function LoginFx() {
    const timeline3 = gsap.timeline({paused: false});
        timeline3.fromTo('.container', {opacity: 0, pointerEvents: 'none'}, {delay: 1, duration: .2, opacity: 1, visibility: 'visible', pointerEvents: 'all'})
        timeline3.fromTo('.container',  { duration: .2, zoom: .5, }, {duration: .3, ease:'back', zoom: 1, })
}

function TabFx(tab: string) {
    const timeline = gsap.timeline();
        timeline.to(tab, {delay: .2, ease:'power3', duration: .5, opacity: 1});
}

export {TabFx};