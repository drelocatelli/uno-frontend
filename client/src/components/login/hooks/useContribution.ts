import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import ReactHtmlParser from 'react-html-parser';
const useContribution = () => {
    const [contributionText, setContributionText] = useState<React.ReactNode>('Olá!');
    const [showing, setShowing] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo('.contribution', {duration: .4, opacity: 0}, {duration: .4, opacity: 1})
            setContributionText('Agradecemos à:');
            setTimeout(() => {
                letreiro();
            }, 3000)
        }, 5000)
    }, []);

    function letreiro() {
        const timeline = gsap.timeline();
        timeline.to('.contribution', { opacity: '0', fontSize: 22, position: 'fixed', y: '100%',onComplete: () => {
                setContributionText(ReactHtmlParser('Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>Andressa<br>'));
                timeline2.resume();
            }})
        const timeline2 = gsap.timeline({paused: true});
            timeline2.to('.contribution', {duration: 0, opacity: 1});
            timeline2.to('.contribution', {duration: 35, ease: 'slow(0.9, 0.1, false)', y: '-100%', })
            timeline2.to('.contribution', {duration: .2, opacity: 0, fontSize: '8rem'})
            timeline2.to('.contribution', {duration: .2, opacity: 1 , onComplete: () => {
                setTimeout(() => {
                    setContributionText('Muito obrigado!')
                }, 1000)
            }})
    }

    useEffect(() => {
        if(showing) {
            const timeline = gsap.timeline();
                timeline.to('.logo', {duration: .5, opacity: 0});
                timeline.to('.container', {duration: .4, opacity: 0, display: 'none'});
                timeline.to('.logo', {display: 'none'});
                timeline.fromTo('.contribution', {display: 'none', opacity: 0}, {display: 'block', opacity: 1})
        }
    }, [showing])


    const handleContributionAnimation = () => {
        const music = new Audio('assets/audio/slowMoMusic.mp3')
        // music.currentTime = 35;
        music.currentTime = 30;
        music.volume = .2;
        music.play();
        setShowing(true);
    }

    
    return {
        handleContributionAnimation,
        contributionText,
        showing
    }
};

export default useContribution;
