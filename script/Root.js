export class Root{

    filePointer;
    folders;
    currentFolder;
    running;

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

    constructor(folders, filePointer){
        this.folders = folders;
        this.filePointer = filePointer;
        this.currentFolder = folders[0];
        this.#preselectFolder(this.currentFolder);
        this.currentFolder.setupFiles();
        this.fileSelectionAudio = 0.3;

        this.running = false;

        document.addEventListener('keydown', async (pressedKey) => {
            if(this.running){

                if(pressedKey.repeat){
    
                }else{
                    switch(pressedKey.keyCode){
                        case Root.controls["forward"]:
                            if(!this.currentFolder.isSelected){
                                //move folder above
                                this.preselectAboveFolder();
                                this.currentFolder.setupFiles();
                            }else{
                                //move file above
                                this.currentFolder.selectAboveFile();
                            }
    
                            break;
        
                        case Root.controls["backward"]:
                            if(!this.currentFolder.isSelected){
                                //move folder below
                                this.preselectBelowFolder();
                                this.currentFolder.setupFiles();
                            }else{
                                //move file below
                                this.currentFolder.selectBelowFile();
                            }
                            break;
                        
                        case Root.controls["use"]:
                            if(!this.currentFolder.isSelected){
                                //select folder and file 1
                                this.currentFolder.unpreselect();
                                this.currentFolder.select();
                                this.currentFolder.currentFile.select();
                            }else{
                                //trying to select a file with no success
                                if(this.currentFolder.currentFile.audio){
                                    //a changer
                                    if(this.currentFolder.previousFile){
                                        this.currentFolder.previousFile.stopAudio();
                                    }
                                    this.currentFolder.currentFile.audio.play();
                                }else{
                                    this.currentFolder.currentFile.bip();
                                }
                            }
                            break;
                        case Root.controls["return"]:
                            if(this.currentFolder.isSelected){
                                //unselect folder
                                this.currentFolder.unselect(false);
                                this.currentFolder.currentFile.unselect();
                            }else{
                                //return to sign in
                                display(menu, 'none');
                                await runMosaicTransition();
                                location.reload();
                            }
                            break;
                    }
                }
            }
        });
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