
class WindowManager{
    currentWindowState
    
    UpdateWindowState(windowState){       
         
        if(windowState == 'closed' && this.currentWindowState != 'closed'){
            audioManager.StopSound('music')
            game.PauseTimer()
        }
        else if (windowState == 'open' && this.currentWindowState != 'open'){
            audioManager.PlaySound('music')
            game.ContinueTimer()
        }

        this.currentWindowState = windowState
     }
}

window.api.receive('window-state-changed', (windowState) => windowManager.UpdateWindowState(windowState))

const windowManager = new WindowManager()