import gsap from 'gsap';

function LobbyFx() {
    gsap.fromTo('.lobby-container',  {scale: '.5'}, {duration: 1, ease: 'slow', scale: '1', opacity: 1})
}

export {LobbyFx};