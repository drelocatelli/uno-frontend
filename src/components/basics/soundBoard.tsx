export function playSound(path: string) {
    const audio = document.querySelector('audio');
    const playAudio = document.querySelector('button[name="audioBtn"]') as HTMLButtonElement;
    if(audio && playAudio) {
        playAudio.onclick = function() {
            audio.play();
        }
        audio.src = path;
        setTimeout(() => {
            playAudio.click();
        }, 500);
    }
}