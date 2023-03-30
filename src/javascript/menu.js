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
        this.BiteAnimation(() => {
            this.menuReference.style.display = 'none'
            this.menuReference.className = ''
        })
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

    BiteAnimation(callback){
        setTimeout(() => {
            this.menuReference.className = 'bite-1'
            audioManager.PlaySound('bite_2')
            setTimeout(() => {
                this.menuReference.className = 'bite-2'
                audioManager.PlaySound('bite_1')
                setTimeout(() => {
                    this.menuReference.className = 'bite-3'
                    audioManager.PlaySound('bite_2')
                    setTimeout(() => {
                        this.menuReference.className = 'bite-4'
                        audioManager.PlaySound('bite_1')
                        setTimeout(() => {
                            this.menuReference.className = 'bite-5'
                            audioManager.PlaySound('bite_2')
                            callback()
                        }, 300)
                
                    }, 300)
            
                }, 300)
        
            }, 300)
    
        }, 300)
    }
}
const menu = new Menu()
