import {gsap} from 'gsap';

export default function LoginFx() {
    const timeline3 = gsap.timeline({paused: false});
        timeline3.fromTo('.container', {opacity: 0, pointerEvents: 'none'}, {duration: .2, visibility: 'visible', pointerEvents: 'all'})
        timeline3.to('.container', {duration: .5, ease: 'power3', opacity: 1, })
        timeline3.fromTo('.container',  { duration: .2, zoom: .5, }, {duration: .3, ease:'back', zoom: 1, })
}

function TabFx(tab: string) {
    const timeline = gsap.timeline();
        timeline.to(tab, {delay: .2, ease:'power3', duration: .5, opacity: 1});
}

function HideLoginFX(callback: Function) {
    gsap.to('#app', {duration: .4, opacity: 0, display: 'none', onComplete: () => {
        setTimeout(() => {
            callback();
        }, 3000)
    }});
}

export {TabFx, HideLoginFX};