export class File{
    id;
    title;
    content;
    element;
    contentElement;
    isSelected;
    isAudio;
    
    path;
    unableAudio;
    selectAudio;
    
    constructor(id, title, content, element, contentElement){
        this.id = id;
        this.title = title;
        this.content = content;
        this.element = element;
        this.contentElement = contentElement;

        this.path = 'SFX/Interactive_Terminal_Telem_0';
        this.unableAudio = [new Audio(this.path+'3.ogg'), new Audio(this.path+'6.ogg'), new Audio(this.path+'7.ogg')];
        for(let i=0; i<3; i++) this.unableAudio[i].volume = 0.2;
        this.selectAudio = new Audio(this.path+'6.ogg');
        this.selectAudio.volume = 0.2;
    }

    setup(){
        this.element.children[0].innerText = this.title;
    }

    select(){
        this.isSelected = true;
        this.element.classList.add('file-selected');
        this.contentElement.children[0].innerText = this.content;
        this.contentElement.style.display = 'grid';
        this.contentElement.focus();
        this.selectAudio.play();
    }

    unselect(){
        this.isSelected = false;
        this.element.classList.remove('file-selected');
        this.contentElement.style.display = 'none';
    }

    bip(){
        this.unableAudio[getRandomInt(3)].play();
    }
}