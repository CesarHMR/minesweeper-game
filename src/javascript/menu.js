class Menu{
    menuReference
    winReference

    gameButtons = {}
    highscoreElements = {}
   

    constructor(){
        this.menuReference = document.querySelector('#menu')
        this.winReference = document.querySelector('#win-screen')

        for(const setting in game.gameSettings){
            this.gameButtons[setting] = document.querySelector(`#${setting}-button`)
            this.gameButtons[setting].onclick = () => this.StartNewGame(setting)
            this.highscoreElements[setting] = document.querySelector(`#${setting}-button div p`)
        }
    }
    
    StartNewGame(setting){
        game.SetNewGame(setting)
        this.SetMenuOff()
        this.RemoveNewHighscore()
    }
    
    SetMenuOff(){
        this.Bite(1)
    }

    SetMenuOn(){
        this.menuReference.style.display = 'flex'
        this.DisplayHighscores()
    }

    DisplayHighscores(){
        for(const setting in game.gameSettings){
            this.highscoreElements[setting].innerText = game.managers.highscoreManager.GetGameHighscoreFormated(setting)
        }
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

    NewHighscore(setting){
        this.highscoreElements[setting].classList.add('new')
    }
    RemoveNewHighscore(){
        for(const setting in this.highscoreElements){
            this.highscoreElements[setting].classList.remove('new')
        }
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
menu.DisplayHighscores()
game.managers.audioManager.PlaySound('music')