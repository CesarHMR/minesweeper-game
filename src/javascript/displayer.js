class Displayer{
    displayReference

    constructor(cssTag){
        this.displayReference = document.querySelector(cssTag)
    }

    Display(content){
        this.displayReference.innerText = content
    }
}