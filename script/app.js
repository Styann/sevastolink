function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function display(element, value){
    element.style.display = value;
}

function animationState(element, bool){
    element.style.animationPlayState = (bool == true) ? 'running' : 'paused';
}