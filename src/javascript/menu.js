class Menu{
    menuReference
    winReference

    easeButton
    mediumButton
    hardButton
    smallHighscore
    bigHoghscore
    higeHighscore

    constructor(){
        this.menuReference = document.querySelector('#menu')
        this.winReference = document.querySelector('#win-screen')

        this.easeButton = document.querySelector('#small-button')
        this.mediumButton = document.querySelector('#big-button')
        this.hardButton = document.querySelector('#huge-button')
        this.easeButton.onclick = () => this.EasyButton()
        this.mediumButton.onclick = () => this.MediumButton()
        this.hardButton.onclick = () => this.HardButton()

        this.smallHighscore = document.querySelector('#small-button div p')
        this.bigHoghscore = document.querySelector('#big-button div p')
        this.higeHighscore = document.querySelector('#huge-button div p')
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
        this.smallHighscore.innerText = this.FormatTime(game.managers.highscoreManager.GetGameHighscore('small'))
        this.bigHoghscore.innerText = this.FormatTime(game.managers.highscoreManager.GetGameHighscore('big'))
        this.higeHighscore.innerText = this.FormatTime(game.managers.highscoreManager.GetGameHighscore('huge'))
    }

    FormatTime(timeInSeconds){
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds) % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
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