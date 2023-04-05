class SettingsManager{

    settingsData = undefined

    fxSlider
    musicSlider
    settingsButton
    settingsMenu

    constructor(){
        this.fxSlider = document.querySelector('#fx-slider')
        this.musicSlider = document.querySelector('#music-slider')
        this.settingsButton = document.querySelector('#settings')
        this.settingsMenu = document.querySelector('#settings-menu')    
        

        this.fxSlider.addEventListener('input', () => this.SliderInput('fx', fxSlider.value))
        this.fxSlider.addEventListener('change', () => this.SliderChange('fx', fxSlider.value))
        this.musicSlider.addEventListener('input', () => this.SliderInput('music', musicSlider.value))
        this.musicSlider.addEventListener('change', () => this.SliderChange('music', musicSlider.value))
        
        this.settingsButton.addEventListener('click', () => {
            if(settingsMenu.classList.contains('off')){
                settingsMenu.classList.remove('off')
            }else{
                settingsMenu.classList.add('off')
                saveManager.SaveData()
            }
        })
        
    }

    GetSettingsData(){
        if(this.settingsData === undefined){
            this.settingsData = game.managers.saveManager.ReadData('settings.json')
        }

        if(this.settingsData === undefined){
            this.settingsData = new SettingsData(50, 50)
        }

        return this.settingsData
    }

    SliderInput(key, value){
        const settings = this.GetSettingsData()
        settings[key] = value
        game.managers.audioManager.ChangeMixerVolume(key, value)
    }

    SliderChange(){
        const settings = this.GetSettingsData()
        game.saveManager.SaveData('settings.json', settings)
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