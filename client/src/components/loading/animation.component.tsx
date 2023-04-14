//@ts-nocheck
import { css } from '@emotion/react';
import gsap from 'gsap';
import { PropsWithChildren, useEffect, useState } from 'react';
import cardsJSON from '../cards/cards.json';

interface IProps extends PropsWithChildren {
  isLoading: boolean;
}
 
function AnimationLoading(props: IProps) {
  const {isLoading} = props;
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        startAnim();
        const animationInterval = setInterval(() => {
            startAnim();
        }, 3000);

        setIntervalId(animationInterval);

        return () => clearInterval(animationInterval);
    }, []);

    const startAnim = () => {
        (function () {
            'use strict';

            let table = document.getElementById('table'),
                cardWidth = 100,
                cardHeight = 150,
                cardCount = 1,
                startingHands = 0;

            function init() {
                // bindEvents();

                // Initial draw
                start();
            }

            function start() {
                if (startingHands < 3) {
                    startingHands++;
                    draw();

                    setTimeout(start, 1000);
                }
            }

            function bindEvents() {
                window.addEventListener('click', () => {
                    draw();
                });
            }

            function draw() {
                let tl = gsap.timeline(),
                    position = getTableCenter(),
                    card = addCard();

                cardCount++;

                gsap.set(card, {
                    y: -table.offsetHeight,
                    x: table.offsetWidth / 2,
                    zIndex: -1,
                });
                let offsetX = table.offsetWidth * 0.5,
                    offsetY = table.offsetHeight * 0.5;
                tl.addLabel('start')
                    .to(
                        card,
                        {
                            duration: 1.5,
                            ease: 'Power2.easeOut',
                            x: position.x + getRandom(-offsetX, offsetX),
                            y: position.y + getRandom(-offsetY, offsetY),
                        },
                        'start',
                    )
                    .to(
                        card,
                        {
                            duration: 1.8,
                            ease: 'Power2.easeOut',
                            rotation: getRandom(360),
                        },
                        'start',
                    );
            }

            function addCard() {
                let card = document.createElement('div');
                card.className = 'card__loading';
                generateCardBg(card);
                table.appendChild(card);

                return card;
            }

            function getTableCenter() {
                return {
                    x: table.offsetLeft + table.offsetWidth / 2 - cardWidth / 2,
                    y: table.offsetTop + table.offsetHeight / 2 - cardHeight / 2,
                };
            }

            function getRandom(min, max = null) {
                let realMax = max === null ? min * 2 : max;
                return min + Math.random() * (realMax - min);
            }

            init();
        })();
    };

    const generateCardBg = (card) => {
        const randomIndex = Math.floor(Math.random() * 2);
        const randomArray = randomIndex === 0 ? cardsJSON.cards : cardsJSON.wildcard;
        const randomCard = randomArray[Math.floor(Math.random() * randomArray.length)];

        console.log(randomCard);
        card.style.setProperty('--bgUrl', `url('/assets/img/cards/${randomCard}.png')`);
    };

    return (
        <>
            <div id="table" css={tableStyle} style={{display: isLoading ? 'block' : 'none'}}></div>
            <div css={{ position: 'relative', zIndex: 2 }}>{props.children}</div>
        </>
    );
}

const tableStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: 100vh;
    overflow: hidden;
    opacity: 0.8;

    .card__loading {
        background-image: var(--bgUrl);
        background-repeat: no-repeat;
        position: absolute;
        width: 125px;
        height: 179px;
        pointer-events: none;
        user-select: none;
    }
`;

export default AnimationLoading;
