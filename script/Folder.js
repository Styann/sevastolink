export class Folder{
    element;
    files;
    currentFile;
    isSelected;
    isEnable;
    selectAudio;
    preselectAudio;

    constructor(element, files){
        this.element = element;
        this.files = files;
        this.isSelected = false;
        this.currentFile = files[0];
        this.selectAudio = new Audio('SFX/Interactive_Terminal_Telem_01.ogg');
        this.preselectAudio = new Audio('SFX/Interactive_Terminal_Telem_04.ogg');
        this.selectAudio.volume = 0.4;
        this.preselectAudio.volume = 0.3;
    }
    
    setupFiles(){
        for(let i = 0; i<this.files.length; i++){
            this.files[i].setup();
        }
    }

    addFile(file){
        this.files.push(file);
    }

    select(){
        this.isSelected = true;
        this.element.classList.add('folder-selected');
        if(!this.currentFile){
            this.currentFile = this.files[0];
        }

        this.selectAudio.play();
    }

    unselect(front = true){
        this.isSelected = false;
        if(front){
            this.element.classList.remove('folder-selected');
        }
    }

    preselect(){
        this.element.classList.add('folder-preselected');
        this.preselectAudio.play();
    }

    unpreselect(){
        this.element.classList.remove('folder-preselected');
    }

    getAboveFile(){
        let index = this.files.indexOf(this.currentFile);
        return (this.files[index-1]) ? this.files[index-1] : null;
    }
    
    getBelowFile(){
        let index = this.files.indexOf(this.currentFile);
        return (this.files[index+1]) ? this.files[index+1] : null;
    }

    #selectFile(file){
        if(file){
            this.currentFile.unselect();
            this.currentFile = file;
            this.currentFile.select();
        }else{
            throw new Error();
        }  
    }

    selectAboveFile(){
        this.#selectFile(this.getAboveFile());
    }
    
    selectBelowFile(){
        this.#selectFile(this.getBelowFile());
    }


}