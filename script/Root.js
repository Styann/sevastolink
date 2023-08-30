export class Root{
    filePointer;
    folders;
    currentFolder;


    constructor(folders, filePointer){
        this.folders = folders;
        this.filePointer = filePointer;
        this.currentFolder = folders[0];
        this.#preselectFolder(this.currentFolder);
        this.currentFolder.setupFiles();
        this.fileSelectionAudio = 0.3;
    }

    getAboveFolder(){
        let index = this.#getCurrentFolderIndex();
        return (index != 0) ? this.folders[index-1] : this.folders[this.folders.length-1];
    }
    
    getBelowFolder(){
        let index = this.#getCurrentFolderIndex();
        return (index != (this.folders.length-1)) ? this.folders[index+1] : this.folders[0];
    }

    resetFolders(){
        for(let i = 0; i<4; i++){
            this.folders[i].classList.remove('selected', 'preselected');
        }
    }

    #preselectFolder(folder){
        if(!this.currentFolder.isSelected){
            this.currentFolder.unselect();
            this.currentFolder.unpreselect();
            this.currentFolder = folder;
            this.currentFolder.preselect();

            let index = this.#getCurrentFolderIndex(); 
            for(let i=1; i<=4; i++){
                if(i == index) continue;
                let className = 'step'+i;
                this.filePointer.classList.remove(className);
            }
            this.filePointer.classList.add('step'+ (index+1));
        }
    }

    #getCurrentFolderIndex(){
        return this.folders.indexOf(this.currentFolder);
    }

    preselectAboveFolder(){
        this.#preselectFolder(this.getAboveFolder());
    }
    
    preselectBelowFolder(){
        this.#preselectFolder(this.getBelowFolder());
    }

    

}