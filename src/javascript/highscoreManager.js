class HighscoreManager{

    highscoreData = undefined

    GetHighscoreData(){
        if(this.highscoreData === undefined){
            this.highscoreData = game.managers.saveManager.ReadData('highscore.json')
        }

        if(this.highscoreData === undefined){
            this.highscoreData = new HighscoreData(0, 0, 0)
        }

        return this.highscoreData
    }

    SetNewHighscore(key, score){
        if(this.GetGameHighscore(key) < score){
            this.highscoreData[key] = score
            game.managers.saveManager.SaveData('highscore.json', this.GetHighscoreData())
            return true
        }

        return false
    }

    SaveHighscore(){
        const highscore = this.GetHighscoreData()
        saveManager.SaveData(highscore)
    }

    GetGameHighscore(key){
        const highscore = this.GetHighscoreData()
        return highscore[key]
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