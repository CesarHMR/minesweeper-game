const clickSound = CreateAudioPool('./sounds/click.mp3', 4)
const winSound = CreateAudioPool('./sounds/win.mp3', 1)
const loseSound = CreateAudioPool('./sounds/lose.mp3', 1)

const AudioManager = {
    click: {
        audio: clickSound,
        volume: 0.2
    },
    win: {
        audio: winSound,
        volume: 0.2
    },
    lose: {
        audio: loseSound,
        volume: 0.2
    }
}


function PlaySound(key){
    sound = GetFromPool(AudioManager[key].audio)
    
    sound.currentTime = 0
    sound.volume = AudioManager[key].volume
    sound.play()
}

function CreateAudioPool(src, amount){
    let pool = []

    for (let index = 0; index < amount; index++) {
        pool.push(new Audio(src))
    }

    return pool
}

function GetFromPool(pool){
    const item = pool.shift()
    pool.push(item)
    return item 
}