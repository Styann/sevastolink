export class ArchiveLog{
    id;
    title;
    content;
    element;
    contentElement;
    isSelected;
    
    audio;
    unableAudio;
    selectAudio;
    
    constructor(id, title, content, element, contentElement, audio = null){
        this.id = id;
        this.title = title;
        this.content = content;
        this.element = element;
        this.contentElement = contentElement;

        let path = 'SFX/Interactive_Terminal_Telem_0';
        this.unableAudio = [new Audio(path+'3.ogg'), new Audio(path+'6.ogg'), new Audio(path+'7.ogg')];
        for(let i=0; i<3; i++) this.unableAudio[i].volume = 0.2;
        this.selectAudio = new Audio(path+'6.ogg');
        this.selectAudio.volume = 0.2;

        if(audio){
            this.audio = new Audio('SFX/Voices/'+audio);
            this.audio.volume = 0.3;
        }

        this.element = this.#createElement();
    }

    play(){
        this.audio.play();
    }

    setup(){

        if(this.element){

            this.element.children[0].innerText = this.title;
            let display = (this.audio) ? 'grid' : 'none';
            this.element.children[1].style.display = display;
        }else{

        }
    }

    select(){
        this.isSelected = true;
        this.element.children[0].classList.add('vline-selected');
        this.element.children[1].classList.add('archive-log-selected');
        this.contentElement.children[0].innerText = this.content;
        this.contentElement.style.display = 'grid';
        this.contentElement.focus();
        this.selectAudio.play();
        this.element.scrollIntoView(false);
    }

    unselect(){
        this.isSelected = false;
        this.element.children[0].classList.remove('vline-selected');
        this.element.children[1].classList.remove('archive-log-selected');
        this.contentElement.style.display = 'none';
    }

    bip(){
        this.unableAudio[getRandomInt(3)].play();
    }

    #createElement(){
        let wrapper = document.createElement('div');
        wrapper.classList.add('archive-log-wrapper');

        let div = document.createElement('div');
        div.classList.add('archive-log');

        let fileLabel = document.createElement('label');
        fileLabel.classList.add('archive-log-label', 'retro-white');
        fileLabel.textContent = this.title;
        
        div.appendChild(fileLabel);
        
        if(this.audio){
            let playLabel =  document.createElement('label');
            playLabel.classList.add('audio-label', 'retro-white');
            playLabel.textContent = 'PLAY';
            
            let playIcon = document.createElement('img');
            playIcon.classList.add('play-icon');
            playIcon.src = './picture/play-icon.svg'
            playIcon.alt =  'play audio';

            div.appendChild(playLabel);
            div.appendChild(playIcon);
        }

        let vline = document.createElement('div');
        vline.classList.add('vline');

        wrapper.appendChild(vline);
        wrapper.appendChild(div);

        return wrapper;
    }
}