function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function display(element, value){
    element.style.display = value;
}

function animationState(element, bool){
    element.style.animationPlayState = (bool == true) ? 'running' : 'paused';
}

function get(id,className){
    if(id) return document.getElementById(id);
    else return document.getElementsByClassName(className)[0];
}


function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
