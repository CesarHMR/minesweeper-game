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
    
    SetMenuOn(){
        this.DisplayHighscores()
        this.menuReference.style["pointer-events"] = "auto";
        this.menuReference.style.display = "flex";
    }
    
    SetMenuOff(){
        this.menuReference.style["pointer-events"] = "none";
        this.Bite(1)
    }
    
    SetEndScreenOn(key){

        this.endScreens[key].classList.remove('off')
        this.endScreens[key].classList.add('on')

        if(key === 'highscore'){
            this.highscoreFromhighscoreScreen.innerText = game.managers.highscoreManager.GetGameHighscoreFormated(game.currentGameSetting.name)
            console.log(this.highscoreFromhighscoreScreen)
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
        console.log(setting)
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
        }, 150)
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