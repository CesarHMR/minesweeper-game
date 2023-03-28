class Menu{
    menuReference
    easeButton
    mediumButton
    hardButton

    constructor(){
        this.menuReference = document.querySelector('#menu')
        this.easeButton = document.querySelector('#easeButton')
        this.mediumButton = document.querySelector('#mediumButton')
        this.hardButton = document.querySelector('#hardButton')
        this.easeButton.onclick = () => this.EasyButton()
        this.mediumButton.onclick = () => this.MediumButton()
        this.hardButton.onclick = () => this.HardButton()
    }
    
    EasyButton(){
        game.SetNewGame('easy')
        this.SetMenuOff()
    }
    
    MediumButton(){
        game.SetNewGame('medium')
        this.SetMenuOff()
    }
    
    HardButton(){
        game.SetNewGame('hard')
        this.SetMenuOff()
    }
    
    SetMenuOff(){
        this.menuReference.style.display = 'none'
    }

    SetMenuOn(){
        this.menuReference.style.display = 'flex'
    }
}

const menu = new Menu()