export class File{
    id;
    title;
    content;
    element;
    isSelected;
    
    constructor(id, title, content, element){
        this.id = id;
        this.title = title;
        this.content = content;
        this.element = element;
    }

    select(){
        this.isSelected = true;
        this.element.classList.add('file-selected');
    }

    unselect(){
        this.isSelected = false;
        this.element.classList.remove('file-selected');
    }
}