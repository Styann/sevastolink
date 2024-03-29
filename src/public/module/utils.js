export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function display(element, value){
    element.style.display = value;
}

export function animationState(element, bool){
    element.style.animationPlayState = (bool == true) ? 'running' : 'paused';
}

export function get(id, className){
    if(id) return document.getElementById(id);
    else return document.getElementsByClassName(className)[0];
}


export async function loadJSON(filePath) {
    const response = await fetch(filePath);
    return response.json();
}

export function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}