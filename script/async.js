function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

 
function waitForKey(key, click = false){
    return new Promise(resolve => {
        var onkeydown = e => {
            if( typeof key === 'undefined' || e.key === key){
                document.removeEventListener('keydown', onkeydown);
                resolve(e);
            }
        };

        var onClick = e => {
            if(e){
                document.removeEventListener('click', onClick);
                resolve(e);
            }
        };

        document.addEventListener('keydown', onkeydown);
        if(click){
            document.addEventListener('click', onClick);
        }
    });
};

function waitAnimationEnded(element){
    return new Promise(resolve => {
        var handler = event => {
            document.removeEventListener('animationend', handler);
            resolve(event);
        };

        element.addEventListener('animationend', handler);
    });
}

function waitForAudio(element){
    return new Promise(resolve => {
        var handler = event => {
            document.removeEventListener('ended', handler);
            resolve(event);
        };

        element.addEventListener('ended', handler);
    });
}