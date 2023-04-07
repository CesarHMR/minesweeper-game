class HighscoreManager{

    highscoreData = undefined

    GetHighscoreData(){
        if(this.highscoreData === undefined){
            this.highscoreData = game.managers.saveManager.ReadData('highscore.json')
        }

        if(this.highscoreData === undefined){
            this.highscoreData = new HighscoreData(undefined, undefined, undefined)
        }

        return this.highscoreData
    }

    SetNewHighscore(setting, score){
        const highscore = this.GetGameHighscoreInSeconds(setting)

        if(highscore === undefined || highscore > score){
            this.highscoreData[setting] = score
            game.managers.saveManager.SaveData('highscore.json', this.GetHighscoreData())
            menu.NewHighscore(setting)
            console.log('new highscore')
            return true
        }

        return false
    }

    SaveHighscore(){
        const highscore = this.GetHighscoreData()
        saveManager.SaveData(highscore)
    }

    GetGameHighscoreInSeconds(setting){
        const highscore = this.GetHighscoreData()
        return highscore[setting]
    }

    GetGameHighscoreFormated(setting){
        const highscore = this.GetGameHighscoreInSeconds(setting)

        if(highscore === undefined) return ''

        const minutes = Math.floor(highscore / 60)
        const seconds = Math.floor(highscore) % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    FormatTime(timeInSeconds){
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds) % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}

class HighscoreData{
    small
    big
    huge

    constructor(small, big, huge){
        this.small = small
        this.big = big
        this.huge = huge
    }
}
