import gsap from 'gsap';

function LobbyFx(element: any) {
    gsap.fromTo(element,  {scale: '.5'}, {duration: 1, ease: 'slow', scale: '1', opacity: 1})
}

export {LobbyFx};