class Menu{
    menuReference
    winReference

    easeButton
    mediumButton
    hardButton

    constructor(){
        this.menuReference = document.querySelector('#menu')
        this.winReference = document.querySelector('#win-screen')

        this.easeButton = document.querySelector('#small-button')
        this.mediumButton = document.querySelector('#big-button')
        this.hardButton = document.querySelector('#huge-button')
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
        this.Bite(1)
    }

    SetMenuOn(){
        this.menuReference.style.display = 'flex'
    }

    SetWinScreenOn(){
        this.winReference.classList.add('on')
        this.winReference.classList.remove('off')
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.SetWinScreenOff()
                this.SetMenuOn()
            }, 3000);    
        })

    }
    
    SetWinScreenOff(){
        this.winReference.classList.remove('on')
        this.winReference.classList.add('off')
    }

    Bite(index){
        setTimeout(() => {
            console.log(index)
            this.menuReference.className = index == 5 ? '' : `bite-${index}`
            game.managers.audioManager.PlaySound(`bite_${index % 2 == 0 ? 2 : 1}`)
            if(index < 5){
                window.requestAnimationFrame(() => this.Bite(index + 1));
            }
            else{
                window.requestAnimationFrame(() => this.menuReference.style.display = 'none')
            }
        }, 300)
    }
}

const menu = new Menu()
game.managers.audioManager.PlaySound('music')