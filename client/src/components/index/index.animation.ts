import { playSound } from "../basics/soundBoard";
import {gsap} from 'gsap';

function IndexFX(onComplete: Function) {
    const timeline2 = gsap.timeline({paused: true});
    timeline2.to('.initialLoading', {duration: .6, opacity: 1})
        
    const timeline3 = gsap.timeline({paused: true});
        timeline3.from('.initialLoading', {duration: 1, y: '50%'})
        timeline3.to('.initialLoading', {ease: 'circ', duration: 1, opacity: 1, onComplete: () => {
            onComplete();
        }})
        
    timeline2.to('.logo', {delay: .3, duration: .8, ease: 'back', y: '0%', onComplete: () => {
        timeline3.resume();
    } })

    const timeline = gsap.timeline();
    timeline.to('.container', {duration: 0, visibility: 'hidden'});
        timeline.to('.logo', {duration: 0, y: '-300%'})
        timeline.to('.logo', {duration: .8,  ease: 'back', y: '40%', onComplete: () => {timeline2.resume()}})
}

function RepelFX(target: string) {
    const targetEl = document.querySelector(target) as HTMLElement;
    targetEl.style.position = 'relative';
    targetEl?.addEventListener('mousemove', (e) => {
        const {offsetX, offsetY} = e as MouseEvent;
        gsap.to(targetEl, { y: `${offsetY * - 1 / 8}px`, x: `${offsetX * - 1 / 8}px`, ease: 'circ' });
    })
    targetEl?.addEventListener('mouseleave', (e) => {
        console.dir(targetEl)
        gsap.to(targetEl, {duration: 2, y: `${targetEl.offsetTop}px`, x: `${targetEl.offsetLeft}px`, ease: 'back' });
    })
}

function IndexFXEnd() {
    const timeline4 = gsap.timeline({paused: false});
        timeline4.to('.initialLoading', {duration: .2, opacity: 0, display: 'none'})
}

export {IndexFX, IndexFXEnd, RepelFX};