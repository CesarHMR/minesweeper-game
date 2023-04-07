class Menu{
    menuReference
    winReference

    gameButtons = {}
    highscoreElements = {}
    endScreens = {}
    highscoreFromhighscoreScreen
   
    constructor(){
        this.menuReference = document.querySelector('#menu')
        const keys = ['win', 'lose', 'highscore']
        keys.forEach(key => this.endScreens[key] = document.querySelector(`#${key}-screen`))
        this.highscoreFromhighscoreScreen = document.querySelector('#highscore-screen #timer p')    

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

    SetEndScreenOn(key){

        this.endScreens[key].classList.remove('off')
        this.endScreens[key].classList.add('on')

        if(key === 'highscore'){
            this.highscoreFromhighscoreScreen.innetText =
            game.managers.highscoreManager.GetGameHighscoreFormated(key)
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                this.endScreens[key].classList.remove('on')
                this.endScreens[key].classList.add('off')
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

    DisplayHighscores(){
        for(const setting in game.gameSettings){
            this.highscoreElements[setting].innerText = game.managers.highscoreManager.GetGameHighscoreFormated(setting)
        }
    }
}

const menu = new Menu()
menu.DisplayHighscores()
game.managers.audioManager.PlaySound('music')