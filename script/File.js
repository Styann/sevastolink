export class File{
    id;
    title;
    content;
    element;
    fileContentElement;
    isSelected;
    isAudio;
    
    path;
    unableAudio;
    
    constructor(id, title, content, element){
        this.id = id;
        this.title = title;
        this.content = content;
        this.element = element;

        this.path = 'SFX/Interactive_Terminal_Telem_0';
        this.unableAudio = [new Audio(this.path+'3.ogg'), new Audio(this.path+'6.ogg'), new Audio(this.path+'7.ogg')];
        for(let i=0; i<3; i++) this.unableAudio.volume = 0.2;
    }

    select(){
        this.isSelected = true;
        this.element.classList.add('file-selected');
    }

    unselect(){
        this.isSelected = false;
        this.element.classList.remove('file-selected');
    }

    bip(){
        this.unableAudio[getRandomInt(3)].play();
    }
}