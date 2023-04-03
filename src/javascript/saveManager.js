class SaveManager{

    data = {
        highscore: undefined,
        settings: undefined
    }

    ModifyData(type, key, value){
        const data = this.data[type]
        data[key] = value
    }

    SaveData(){
        window.api.send('save-data', [ 'data.json', JSON.stringify(this.data) ])
    }

    ReadData(){
        const file = window.api.sendSync('read-data-sync', 'data.json')

        if(file === undefined){
            console.error('File not found!')
            return 'fail'
        }
        else{
            this.data = JSON.parse(file)
            return 'success'
        }
    }

    SetNewData(){
        this.data.highscore = new HighscoreData(0, 0, 0)
        this.data.settings = new SettingsData(50, 50)
    }

    SetGame(){
        const response = this.ReadData()
        console.log(response)
        if(response === 'fail'){
            this.SetNewData()
        }

    //     for(const key in this.currentScoreData){

    //     }

        for(const key in this.data.settings){
            console.log(key)
            console.log(this.data.settings[key])
            audioManager.ChangeMixerVolume(key, this.data.settings[key])
        }
    }
}

class HighscoreData{
    small
    medium
    big

    constructor(small, medium, big){
        this.small = small
        this.medium = medium
        this.big = big
    }
}

class SettingsData{
    fx
    music

    constructor(fx, music){
        this.fx = fx
        this.music = music
    }
}

const saveManager = new SaveManager()
saveManager.SetGame()