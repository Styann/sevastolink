export class Root{

    static filePointer;
    static folders;
    static currentFolder;
    static running;

    static document;
    static controls = {
        "forward" : 90,
        "backward" : 83,
        "left" : 81,
        "right" : 68,
        "use": 69,
        "return" : 65,
        "page-up" : 33,
        "page-down" : 34
    };

    static static_constructor(folders, filePointer){
        Root.folders = folders;
        Root.filePointer = filePointer;
        Root.currentFolder = folders[0];
        Root.#preselectFolder(Root.currentFolder);
        Root.currentFolder.setupFiles();
        Root.fileSelectionAudio = 0.3;
    
        Root.running = false;
    }

    static getAboveFolder(){
        let index = Root.#getCurrentFolderIndex();
        return (index != 0) ? Root.folders[index-1] : Root.folders[Root.folders.length-1];
    }
    
    static getBelowFolder(){
        let index = Root.#getCurrentFolderIndex();
        return (index != (Root.folders.length-1)) ? Root.folders[index+1] : Root.folders[0];
    }

    static resetFolders(){
        for(let i = 0; i<4; i++){
            Root.folders[i].classList.remove('selected', 'preselected');
        }
    }

    static #preselectFolder(folder){
        if(!Root.currentFolder.isSelected){
            Root.currentFolder.unselect();
            Root.currentFolder.unpreselect();
            Root.currentFolder = folder;
            Root.currentFolder.preselect();

            let index = Root.#getCurrentFolderIndex(); 
            for(let i=1; i<=4; i++){
                if(i == index) continue;
                let className = 'step'+i;
                Root.filePointer.classList.remove(className);
            }
            Root.filePointer.classList.add('step'+ (index+1));
        }
    }

    static #getCurrentFolderIndex(){
        return Root.folders.indexOf(Root.currentFolder);
    }

    static preselectAboveFolder(){
        Root.#preselectFolder(Root.getAboveFolder());
    }
    
    static preselectBelowFolder(){
        Root.#preselectFolder(Root.getBelowFolder());
    }

    

}