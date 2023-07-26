export class Root{
    folders;
    currentFolder;

    constructor(folders){
        this.folders = folders;
        this.currentFolder = folders[0];
        this.#preselectFolder(this.currentFolder);
        this.currentFolder.setupFiles();
        this.fileSelectionAudio = 0.3;
    }

    getAboveFolder(){
        let index = this.folders.indexOf(this.currentFolder);
        return (index != 0) ? this.folders[index-1] : this.folders[this.folders.length-1];
    }
    
    getBelowFolder(){
        let index = this.folders.indexOf(this.currentFolder);
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
        }
    }

    preselectAboveFolder(){
        this.#preselectFolder(this.getAboveFolder());
    }
    
    preselectBelowFolder(){
        this.#preselectFolder(this.getBelowFolder());
    }

}