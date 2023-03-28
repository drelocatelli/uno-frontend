import gsap from "gsap";

export function LoadingFX() {
    const timeline = gsap.timeline({paused: false, repeat: -1});
        timeline.to('.loadingio-spinner-cube-6swp5biih6b', {delay: 1, duration: 1.5, rotate: '90deg'});
}