class Timer{
    startTime           //track of the time the timer started - to get total time
    displayer           //reference to the displayer
    intervalReference   //reference to setInterval
    startTimePause      //track of the time the timer was paused
    timePaused = 0      //amount of time the timer stayed paused - to remove from total time

    totalTime

    constructor(displayer){
        this.displayer = displayer
    }

    Start(){
        this.totalTime = 0
        this.startTime = Date.now()
    }

    Stop(){
        this.totalTime = this.GetTime()
    }
        
    Pause(){
        this.startTimePause = Date.now()
        this.StopDisplaying()
    }
    
    Continue(){
        this.timePaused += Date.now() - this.startTimePause
        this.StartDisplaying()
    }

    GetTime(){
        return (Date.now() - this.startTime - this.timePaused) / 1000
    }

    FormatTime(){
        const time = this.GetTime()
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time) % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    StartDisplaying(){
        this.intervalReference = setInterval(() => {
            this.displayer.Display(this.FormatTime())
        }, 500)
    }

    StopDisplaying(){
        if(this.intervalReference === undefined) return
        
        clearInterval(this.intervalReference)
    }
}