class Timer{
    time = 0
    displayer
    intervalReference

    constructor(displayer){
        this.displayer = displayer
    }

    Start(){
        this.intervalReference = setInterval(() => {
            this.time++
            this.displayer.Display(this.FormatTime())
        }, 1000)
    }
    
    Stop(){
        if(this.intervalReference === undefined) return
        
        clearInterval(this.intervalReference)
        this.displayer.Display(this.time)
    }

    Reset(){
        this.Stop()
        this.time = 0
    }

    GetTime(){
        return this.time
    }

    FormatTime(){       
        const minutes = Math.floor(this.time / 60)
        const seconds = this.time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}