import {gsap} from 'gsap';
import { playSound } from '../basics/soundBoard';


export default function LoginFx() {
    const timeline3 = gsap.timeline({paused: true});
        timeline3.fromTo('.container', {opacity: 0, pointerEvents: 'none'}, {delay: 1, duration: .2, opacity: 1, visibility: 'visible', pointerEvents: 'all'})
        timeline3.fromTo('.container',  { duration: .2, zoom: .5, }, {duration: .3, ease:'back', zoom: 1, })
    
    const timeline2 = gsap.timeline({paused: true});
    timeline2.to('.logo', {delay: .3, duration: .8, ease: 'back', y: '-20%', onComplete: () => {
        timeline3.resume();
        playSound('/assets/audio/Pop_sound_effect.mp3');
    } })

    const timeline = gsap.timeline();
    timeline.to('.container', {duration: 0, visibility: 'hidden'});
        timeline.to('.logo', {duration: 0, y: '-300%'})
        timeline.to('.logo', {duration: .8,  ease: 'back', y: '40%', onComplete: () => {timeline2.resume()}})
}

function TabFx(tab: string) {
    const timeline = gsap.timeline();
        timeline.to(tab, {delay: .2, ease:'power3', duration: .5, opacity: 1});
}

export {TabFx};