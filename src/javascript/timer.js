class Timer{
    startTime           //track of the time the timer started - to get total time
    displayer           //reference to the displayer
    intervalReference   //reference to setInterval
    startTimePause      //track of the time the timer was paused
    timePaused          //amount of time the timer stayed paused - to remove from total time

    totalTime

    constructor(displayer){
        this.displayer = displayer
    }

    Start(){
            this.displayer.Display(this.FormatTime())
        this.startTime = Date.now()
    }
        
    Pause(){
        this.startTimePause = Date.now()
    }

    Continue(){
        this.timePaused += this.startTimePause + Date.now()
    }

    Stop(){
        this.totalTime
    }

    GetTime(){
        return (this.startTime - Date.now() - this.timePaused) / 1000
    }

    FormatTime(){
        const time = GetTime()
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    StartDisplaying(){
        this.intervalReference = setInterval(() => {
            this.displayer.Display(this.FormatTime())
        }, 1000)
    }

    StopDisplaying(){
        if(this.intervalReference === undefined) return
        
        clearInterval(this.intervalReference)
        this.displayer.Display(this.time)
    }
}