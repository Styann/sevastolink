function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function display(element, value){
    element.style.display = value;
}

function animationState(element, bool){
    element.style.animationPlayState = (bool == true) ? 'running' : 'paused';
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