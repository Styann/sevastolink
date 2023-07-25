export class Folder{
    element;
    files;
    currentFile;
    isSelected;
    isEnable;

    constructor(element, files){
        this.element = element;
        this.files = files;
        this.isSelected = false;
        this.currentFile = files[0];
    }
    

    select(){
        this.isSelected = true;
        this.element.classList.add('folder-selected');
    }

    unselect(front = true){
        this.isSelected = false;
        if(front){
            this.element.classList.remove('folder-selected');
        }
    }

    preselect(){
        this.element.classList.add('folder-preselected');
    }

    unpreselect(){
        this.element.classList.remove('folder-preselected');
    }

    getAboveFile(){
        let index = this.files.indexOf(this.currentFolder);
        return (this.files[index-1]) ? this.files[index-1] : null;
    }
    
    getBelowFile(){
        let index = this.files.indexOf(this.currentFolder);
        return (this.files[index+1]) ? this.files[index+1] : null;
    }

    #selectFile(file){
        if(!this.currentFile.isSelected){
            if(file){
                this.currentFile.unpreselect();
                this.currentFile = file;
                this.currentFile.preselect();
            }else{
                throw new Error();
            }
        }
    }

    selectAboveFile(){
        this.#selectFile(this.getAboveFile());
    }
    
    selectBelowFile(){
        this.#selectFile(this.getBelowFile());
    }


}