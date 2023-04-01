class AudioManager{

    audioConfigs = {
        click: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx'
        },
        win: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx'
        },
        lose: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx'
        },
        bite_1: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx'
        },
        bite_2: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx'
        },
        music: {
            audio: [],
            volume: 0.05,
            loop: true,
            mixer: 'music'
        }
    }

    mixerConfigs = {
        fx: {
            volume: 1
        },
        music: {
            volume: 1
        }
    }
    
    constructor(){
        this.audioConfigs['click'].audio = this.CreateAudioPool('./sounds/click.mp3', 4)
        this.audioConfigs['win'].audio = this.CreateAudioPool('./sounds/win.mp3', 1)
        this.audioConfigs['lose'].audio = this.CreateAudioPool('./sounds/lose.mp3', 1)
        this.audioConfigs['bite_1'].audio = this.CreateAudioPool('./sounds/bite_1.mp3', 1)
        this.audioConfigs['bite_2'].audio = this.CreateAudioPool('./sounds/bite_2.mp3', 1)
        this.audioConfigs['music'].audio = this.CreateAudioPool('./sounds/music.mp3', 1)
        
        document.querySelector('#fx-slider').addEventListener('input', () => this.ChangeMixerVolume('fx', this.value))
    }

    PlaySound(key){
        const config = this.audioConfigs[key]
        const audio = this.GetFromPool(config.audio)
        const mixerVolume = this.mixerConfigs[config.mixer].volume
        
        audio.volume = config.volume * mixerVolume
        audio.loop = config.loop
        audio.currentTime = 0
        audio.play()
    }

    StopSound(key){
        const audios = this.audioConfigs[key].audio
        audios.forEach(audio => {
            audio.pause()
        })
    }
    
    CreateAudioPool(src, amount){
        const pool = []
    
        for (let index = 0; index < amount; index++) {
            pool.push(new Audio(src))
        }
    
        return pool
    }
    
    GetFromPool(pool){
        const item = pool.shift()
        pool.push(item)
        return item 
    }

    ChangeMixerVolume(key, value){ //range from 0 to 1
        const normalizedValue = value / 100
        let mixerVolume = this.mixerConfigs[key].volume = normalizedValue
        
        for(const key in this.audioConfigs){
            if(this.audioConfigs[key].mixer == key && this.audioConfigs[key].loop == true){
                this.audioConfigs[key].audio.forEach(audio => {
                    audio.volume = this.audioConfigs[key].volume * mixerVolume
                });
            }
        }
    }
}

const audioManager = new AudioManager()
audioManager.PlaySound('music')