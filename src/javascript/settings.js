const settingsButton = document.querySelector('#settings')
const settingsMenu = document.querySelector('#settings-menu')
const fxSlider = document.querySelector('#fx-slider')
const musicSlider = document.querySelector('#music-slider')

settingsButton.addEventListener('click', () => {
    if(settingsMenu.classList.contains('off')){
        settingsMenu.classList.remove('off')
    }else{
        settingsMenu.classList.add('off')
        saveManager.SaveData()
    }
})

fxSlider.addEventListener('input', () => audioManager.ChangeMixerVolume('fx', fxSlider.value))
musicSlider.addEventListener('input', () => audioManager.ChangeMixerVolume('music', musicSlider.value))
fxSlider.addEventListener('change', () => saveManager.ModifyData('settings', 'fx', fxSlider.value))
musicSlider.addEventListener('change', () => saveManager.ModifyData('settings', 'music', musicSlider.value))