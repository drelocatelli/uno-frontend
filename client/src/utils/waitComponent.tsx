function waitComponent(element: React.MutableRefObject<HTMLElement | null>, cb: any) {
    const retry = setInterval(() => {
        if(element.current != null) {
            clearInterval(retry);
            cb();
        }
    }, 1000)
}

export {waitComponent};