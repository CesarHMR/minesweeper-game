class Menu{
    menuReference
    winReference

    easeButton
    mediumButton
    hardButton

    constructor(){
        this.menuReference = document.querySelector('#menu')
        this.winReference = document.querySelector('#win-screen')

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

    SetWinScreenOn(){
        this.winReference.classList.remove('off')
        this.winReference.classList.add('on')

        setTimeout(() => {
            this.SetWinScreenOff()
            this.SetMenuOn()
        }, 3000);
    }
    
    SetWinScreenOff(){
        this.winReference.classList.remove('on')
        this.winReference.classList.add('off')
    }
}
const menu = new Menu()
