export class ArchiveLog{
    id;
    title;
    content;
    element;
    isSelected;
    audio;

    static contentElement = document.getElementById('archive-log-content');
    static selectAudio;
    static unableAudio;
    
    static{
        var path = 'SFX/Interactive_Terminal_Telem_0';

        ArchiveLog.selectAudio = new Audio(path+'6.ogg');
        ArchiveLog.selectAudio.volume = 0.2;
        
        ArchiveLog.unableAudio = [new Audio(path+'3.ogg'), new Audio(path+'6.ogg'), new Audio(path+'7.ogg')];
        for(let i=0; i<3; i++) ArchiveLog.unableAudio[i].volume = 0.2;
    }

    constructor(id, title, content, audio = null){
        this.id = id;
        this.title = title;
        this.content = content + '\n'.repeat(10);

        if(audio){
            this.audio = new Audio('SFX/Voices/'+audio);
            this.audio.volume = 0.3;
        }

        this.element = this.#createElement();
    }

    stopAudio(){
        if(this.audio){
            if(!this.audio.ended){
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        } 
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
        ArchiveLog.contentElement.children[0].innerText = this.content;
        ArchiveLog.contentElement.style.display = 'grid';
        ArchiveLog.contentElement.focus();
        ArchiveLog.contentElement.scrollTop = 0;
        ArchiveLog.selectAudio.play();
        this.element.scrollIntoView(false);
    }

    unselect(){
        this.isSelected = false;
        this.element.children[0].classList.remove('vline-selected');
        this.element.children[1].classList.remove('archive-log-selected');
        ArchiveLog.contentElement.style.display = 'none';
    }

    bip(){
        ArchiveLog.unableAudio[getRandomInt(3)].play();
    }

    #getIdToString(){
        let str = '#';

        if(this.id < 10){
            str += '00';
        }else if(this.id < 100 && this.id > 9){
            str += '0';
        }

        return str+this.id;
    }

    #createElement(){
        let wrapper = document.createElement('div');
        wrapper.classList.add('archive-log-wrapper');

        let div = document.createElement('div');
        div.classList.add('archive-log');

        let idLabel = document.createElement('label');
        idLabel.classList.add('archive-log-id-label', 'retro-orange');
        idLabel.appendChild(document.createTextNode(this.#getIdToString()));

        let fileLabel = document.createElement('label');
        fileLabel.classList.add('archive-log-label', 'retro-white');
        fileLabel.appendChild(document.createTextNode(this.title));
        
        div.appendChild(idLabel);
        div.appendChild(fileLabel);
        
        if(this.audio){
            let playLabel =  document.createElement('label');
            playLabel.classList.add('audio-label', 'retro-white');
            playLabel.textContent = 'PLAY';
            
            let playIcon = document.createElement('img');
            playIcon.classList.add('play-icon');
            playIcon.src = './assets/play-icon.svg'
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