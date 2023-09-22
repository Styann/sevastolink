import { ArchiveLog } from "./ArchiveLog.js";

export class Folder{
    name;
    element;
    files;
    currentFile;
    previousFile;
    isSelected;
    isEnable;
    borders;
    
    static archiveLogsJSON;
    static fileListElement = document.getElementById('archive-log-list');
    static selectAudio = new Audio('SFX/Interactive_Terminal_Telem_01.ogg');
    static preselectAudio = new Audio('SFX/Interactive_Terminal_Telem_04.ogg');
    static unspecifiedDay = [11, 24, 25, 60, 89, 90, 115, 139];

    static{
        Folder.selectAudio.volume = 0.4;
        Folder.preselectAudio.volume = 0.3;
    }

    constructor(name, element, borders){
        this.element = element;
        this.files = [];
        this.isSelected = false;
        this.currentFile = this.files[0];
        this.borders = borders;
        this.name = name;
        this.addArchiveLogs();
    }
    
    setupFiles(){
        Folder.fileListElement.textContent = '';

        
        for(let i = 0; i<this.files.length; i++){
            Folder.fileListElement.appendChild(this.files[i].element);
        }
        
        if(this.files.length == 1){
            Folder.fileListElement.appendChild(this.createEmptySlot());          
        }

    }

    createEmptySlot(){
        let div = document.createElement('div');
        div.classList.add('file');
        return div;
    }

    addArchiveLogs(){
        var logsJSON = Folder.archiveLogsJSON[this.name];
        var log;
        var audio;
        
        if(logsJSON == undefined){
            this.files.push(new ArchiveLog(11, 'gdg', 'gfdsg'));
        }else{
            for(let i = 0; i<logsJSON.length; i++){
                log = logsJSON[i];
                audio = log['audio'];
                if(audio.length == 0){
                    this.files.push(new ArchiveLog(log['id'], log['title'], log['content']));
                }else{
                    this.files.push(new ArchiveLog(log['id'], log['title'], log['content'], audio));
                }
            }
            
        }
        console.log(this.files)

    
    }

    #toggleBorders(turnon = true){
        for(let border of this.borders){
            if(turnon){
                border.classList.add('border-selected');
            }else{
                border.classList.remove('border-selected');
            }
        } 
    }

    select(){
        this.isSelected = true;
        this.element.classList.add('folder-selected');
        this.#toggleBorders();
        if(!this.currentFile){
            this.currentFile = this.files[0];
        }

        Folder.selectAudio.play();
    }

    unselect(front = true){
        this.isSelected = false;
        if(front){
            this.element.classList.remove('folder-selected');
            this.#toggleBorders(false);
        }
    }

    preselect(){
        this.element.classList.add('folder-preselected');
        this.borders[1].classList.add('right-border-preselected');
        Folder.preselectAudio.play();
    }

    unpreselect(){
        this.element.classList.remove('folder-preselected');
        this.borders[1].classList.remove('right-border-preselected');
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
            this.previousFile = this.currentFile;
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