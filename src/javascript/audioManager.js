class AudioManager{

    soundsPath = './sounds/'

    audioConfigs = {
        click: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.mp3',
            amount: 4,
        },
        win: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.mp3'
        },
        lose: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.mp3'
        },
        bite_1: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.mp3'
        },
        bite_2: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.mp3'
        },
        music: {
            audio: [],
            volume: 0.07,
            loop: true,
            format: '.mp3',
            mixer: 'music'
        },
        bomb: {
            audio: [],
            volume: 0.2,
            loop: false,
            mixer: 'fx',
            format: '.wav',
            amount: 5,
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

    audioPool = {}
    
    constructor(){

        for(const audio in this.audioConfigs){
            this.audioPool[audio] = this.CreateAudioPool(audio, this.audioConfigs[audio])
        }
    }

    PlaySound(key){
        const config = this.audioConfigs[key]
        const audio = this.GetFromPool(this.audioPool[key])
        const mixerVolume = this.mixerConfigs[config.mixer].volume
        
        audio.volume = config.volume * mixerVolume
        audio.loop = config.loop
        audio.currentTime = 0
        audio.play()
    }

    StopSound(key){
        const audios = this.audioPool[key]
        audios.forEach(audio => {
            audio.pause()
        })
    }
    
    CreateAudioPool(name, config){

        const pool = []

        const amount = config.amount || 1
        const src = './sounds/' + name + config.format
    
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

    ChangeMixerVolume(mixerKey, value){ //range from 0 to 1
        if(this.mixerConfigs[mixerKey] === undefined) return

        const normalizedValue = value / 100
        this.mixerConfigs[mixerKey].volume = normalizedValue

        for(const key in this.audioConfigs){
            if(this.audioConfigs[key].mixer == mixerKey && this.audioConfigs[key].loop == true){
                this.audioPool[key].forEach(audio => {
                    audio.volume = parseFloat(this.audioConfigs[key].volume * normalizedValue)
                });
            }
        }
    }
}