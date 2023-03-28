import {gsap} from 'gsap';

export default function AlertFx() {
    const timeline = gsap.timeline({paused: false});
    timeline.to('.alert', {duration: 0, x: '300px'})
    timeline.to('.alert', {opacity: 1, pointerEvents: 'all'})
        timeline.to('.alert', {duration: .6, ease: 'back', x: '0'})
}

export function AlertCloseFx() {
    const timeline = gsap.timeline({paused: false});
    timeline.to('.alert', {duration: .4, ease: 'circ', pointerEvents: 'none', opacity: 0})
}