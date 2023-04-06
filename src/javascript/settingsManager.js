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
        

        this.fxSlider.addEventListener('input', () => this.SliderInput('fx', this.fxSlider.value))
        this.fxSlider.addEventListener('change', () => this.SliderChange('fx', this.fxSlider.value))
        this.musicSlider.addEventListener('input', () => this.SliderInput('music', this.musicSlider.value))
        this.musicSlider.addEventListener('change', () => this.SliderChange('music', this.musicSlider.value))
        
        this.settingsButton.addEventListener('click', () => {
            if(this.settingsMenu.classList.contains('off'))
            {
                this.settingsMenu.classList.remove('off')
            }
            else
            {
                this.settingsMenu.classList.add('off')
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
        game.managers.saveManager.SaveData('settings.json', settings)
    }

    Initialize(){
        const settings = this.GetSettingsData()

        game.managers.audioManager.ChangeMixerVolume('fx', settings['fx'])
        game.managers.audioManager.ChangeMixerVolume('music', settings['music'])
        this.fxSlider.value = settings['fx']
        this.musicSlider.value = settings['music']
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