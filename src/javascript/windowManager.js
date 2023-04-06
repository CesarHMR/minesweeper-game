
class WindowManager{
    currentWindowState
    
    UpdateWindowState(windowState){       
         
        if(windowState == 'closed' && this.currentWindowState != 'closed'){
            game.managers.audioManager.StopSound('music')
            game.timer.Pause()
        }
        else if (windowState == 'open' && this.currentWindowState != 'open'){
            game.managers.audioManager.PlaySound('music')
            game.timer.Continue()
        }

        this.currentWindowState = windowState
     }
}

window.api.receive('window-state-changed', (windowState) => windowManager.UpdateWindowState(windowState))

const windowManager = new WindowManager()