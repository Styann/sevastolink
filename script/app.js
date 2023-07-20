function getAboveFolder(folder, folders){
    let index = folders.indexOf(folder);
    return (folders[index-1]) ? folders[index-1] : null;
}

function getBelowFolder(folder, folders){
    let index = folders.indexOf(folder);
    return (folders[index+1]) ? folders[index+1] : null;
}

function selectFolder(folder, folders, currentFolder){
    if(!folder.classList.contains('selected')){
        for(const folder2 of folders){
            folder2.classList.remove('selected');
        }
        currentFolder = folder;
        currentFolder.classList.add('selected');
        currentFolder.classList.remove('preselected')
    }
}

function resetFolders(folders){
    for(let i = 0; i<folders.length; i++){
        folders[i].classList.remove('selected', 'preselected');
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function display(element, value){
    element.style.display = value;
}

function animationState(element, bool){
    element.style.animationPlayState = (bool == true) ? 'running' : 'paused';
}
