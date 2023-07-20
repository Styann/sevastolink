export class SystemTree{
    folders;
    currentFolder;

    constructor(folders){
        this.folders = folders;
        this.currentFolder = folders[0];
    }

    getAboveFolder(){
        let index = this.folders.indexOf(this.currentFolder);
        return (this.folders[index-1]) ? this.folders[index-1] : null;
    }
    
    getBelowFolder(){
        let index = this.folders.indexOf(this.currentFolder);
        return (this.folders[index+1]) ? this.folders[index+1] : null;
    }

    resetFolders(){
        for(let i = 0; i<4; i++){
            this.folders[i].classList.remove('selected', 'preselected');
        }
    }

    #preselectFolder(folder){
        if(!this.currentFolder.isSelected){
            if(folder){
                this.currentFolder.unpreselect();
                this.currentFolder = folder;
                this.currentFolder.preselect();
            }else{
                throw new Error();
            }
        }
    }

    preselectAboveFolder(){
        this.#preselectFolder(this.getAboveFolder());
    }
    
    preselectBelowFolder(){
        this.#preselectFolder(this.getBelowFolder());
    }

}