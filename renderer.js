document.querySelector('#close').addEventListener('click', () => {
    window.api.send("close");
})

document.querySelector('#minimize').addEventListener('click', () => {
    window.api.send('minimize')
})

function SaveData(){
    console.log('save data')
    const timeSpan = new TimeSpan(1, 30)
    window.api.send('save-data', JSON.stringify(timeSpan))
}

class Score{
    quickHighscore
    longHighscore
    jorneyHighscore

    constructor(quick, long, jorney){
        
    }
}

class TimeSpan{
    minutes
    seconds

    constructor(minutes, seconds){
        this.minutes = minutes
        this.seconds = seconds
    }
}

window.api.receive('data-readed', (data) => {
    console.log(JSON.parse(data.toString()))
})