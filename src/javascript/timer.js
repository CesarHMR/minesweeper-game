class Timer{
    startTime           //track of the time the timer started - to get total time
    displayer           //reference to the displayer
    intervalReference   //reference to setInterval
    startTimePause      //track of the time the timer was paused
    timePaused = 0      //amount of time the timer stayed paused - to remove from total time

    totalTime

    currentState = 'none' // none running paused stoped

    constructor(displayer){
        this.displayer = displayer
    }

    Start(){
        if(!this.ChangeState('running')) return
        console.log('start')
        this.totalTime = 0
        this.startTime = Date.now()
        this.StartDisplaying()
    }

    Stop(){
        this.totalTime = this.GetTime()
        this.StopDisplaying()
    }
        
    Pause(){
        if(!this.ChangeState('paused')) return

        this.startTimePause = Date.now()
        this.StopDisplaying()
    }
    
    Continue(){
        if(!this.ChangeState('continue')) return

        this.timePaused += Date.now() - this.startTimePause
        this.StartDisplaying()
    }

    GetTime(){
        return (Date.now() - this.startTime - this.timePaused) / 1000
    }

    FormatTime(){
        const time = this.GetTime()
        
        if(time <= 0) return '00:00'

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time) % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    StartDisplaying(){
        this.displayer.Display(this.FormatTime())
        this.intervalReference = setInterval(() => {
            this.displayer.Display(this.FormatTime())
        }, 500)
    }

    StopDisplaying(){
        if(this.intervalReference === undefined) return
        
        clearInterval(this.intervalReference)
    }

    ChangeState(state){
        switch (state){
            case 'running':
                if(this.currentState === 'none' || this.currentState === 'paused'){
                    console.log(this.currentState, state, 'true')
                    this.currentState = state
                    return true
                }
                console.log(this.currentState, state, 'false')
                return false
            
            case 'paused':
                if(this.currentState === 'running'){
                    console.log(this.currentState, state, 'true')
                    this.currentState = state
                    return true
                }
                console.log(this.currentState, state, 'false')
                return false

            case 'continue':
                if(this.currentState === 'paused'){
                    console.log(this.currentState, state, 'true')
                    this.currentState = 'running'
                    return true
                }
                console.log(this.currentState, state, 'false')
                return false            
            
            case 'stoped':
                if(this.currentState === 'running'){
                    console.log(this.currentState, state, 'true')
                    this.currentState = state
                    return true
                }
                console.log(this.currentState, state, 'false')
                return false

            default:
                console.log(this.currentState, state, 'false')
                return false
        }
    }
}