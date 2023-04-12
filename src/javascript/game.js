class Game {
    managers= {
        highscoreManager: {},
        settingsManager: {},
        saveManager: {},
        audioManager: {}
    }
    
    allowInput
    minesAreSetted
    gameGridReference
    bombDisplayer
    timerDisplayer
    timer

    fields = []

    gridSize = 0
    minesAmount = 0

    fieldsToAnimate = []
    currentGameSetting

    elementOnFocus

    gameSettings = {
        small: {
            name: 'small',
            gridSize: 5,
            minesAmount: 4,
            delayInMilliseconds: 200,
            explosionDelay: 300,
        },
        big: {
            name: 'big',
            gridSize: 8,
            minesAmount: 10,
            delayInMilliseconds: 150,
            explosionDelay: 150,
        },
        huge:{
            name: 'huge',
            gridSize: 12,
            minesAmount: 22,
            delayInMilliseconds: 100,
            explosionDelay: 80,
        }
    }

    constructor(){
        this.managers.highscoreManager = new HighscoreManager()
        this.managers.settingsManager = new SettingsManager()
        this.managers.saveManager = new SaveManager()
        this.managers.audioManager = new AudioManager()

        this.gameGridReference = document.querySelector('#game-grid')
        this.bombDisplayer = new Displayer('#bomb-label p')
        this.timerDisplayer = new Displayer('#timer-label p')
        this.timer = new Timer(this.timerDisplayer)
    }

    SetNewGame(gameKey) {

        this.currentGameSetting = this.gameSettings[gameKey]

        this.SetGridSize()
        this.SetFields()
        this.DisplayGame()

        window.onmouseup = () => this.RemoveFocusOfField()//find better place to put
    }

    DisplayGame(){
        this.bombDisplayer.Display(this.minesAmount)
        this.timer.Start()
        this.minesAreSetted = false
        this.allowInput = true
    }

    SetGridSize(){
        this.gameGridReference.innerHTML = ''
        this.gridSize = this.currentGameSetting.gridSize
        this.minesAmount = this.currentGameSetting.minesAmount
        document.querySelector(':root').style.setProperty('--gridSize', this.gridSize);
    }

    SetFields(){
        this.fields = []

        for (let index = 0; index < this.gridSize * this.gridSize; index++) {
            this.fields.push({
                HTMLelement: {},
                hasMine: false,
                hasFlag: false,
                isRevealed: false
            })
        }

        this.fields.forEach((field, index) => {
            this.CreateFieldElement(field)
        })
    }
    
    SetMines(clickedField){
        const fieldsThatCanBeMined = this.fields.filter(field => field != clickedField)

        let mines = []

        for (let index = 0; index < fieldsThatCanBeMined.length; index++) {
            mines.push(this.currentGameSetting.minesAmount > index)
        }

        mines = mines.sort(() => Math.random() - 0.5)

        for (let index = 0; index < fieldsThatCanBeMined.length; index++) {
            fieldsThatCanBeMined[index].hasMine = mines[index]
            
            if(fieldsThatCanBeMined[index].hasMine)
                fieldsThatCanBeMined[index].HTMLelement.classList.add('mine')
        }

        this.minesAreSetted = true
    }

    CreateFieldElement(field){
        field.HTMLelement = document.createElement('button')
        field.HTMLelement.appendChild(document.createElement('div'))
        field.HTMLelement.classList.add('field')
    
        field.HTMLelement.onclick = () => {
            if(this.allowInput && !this.minesAreSetted) this.SetMines(field)
            if(this.allowInput) this.RevealField(field)
        }
        field.HTMLelement.oncontextmenu = () => {
            if(this.allowInput) this.FlagField(field)
        }
        field.HTMLelement.onmousedown = () => {
            if(this.allowInput) this.AddFocusToField(field)
        }

        this.gameGridReference.appendChild(field.HTMLelement)
    }

    ClearField(field){
        field.isRevealed= true
        const minesArround = this.CountMinesArround(field)
        
        if(!field.hasMine){
            field.HTMLelement.firstChild.innerText = minesArround !== 0 ? minesArround: ''
        }
    
        this.fieldsToAnimate.push(field.HTMLelement)
        
        if(minesArround === 0 && !field.hasMine){   
            this.ClearFieldsArround(field)
        }
    }
           
    CountMinesArround(field){
        const allSides = this.GetFieldsArround(field)
    
        const minesArround = allSides.filter(side => {
            return side !== undefined ? this.fields[side].hasMine : false
        })

        return minesArround.length
    }
    
    GetFieldsArround(field){
        const index = this.fields.indexOf(field)
        const allSides = []
        
        allSides.push(index - this.gridSize >= 0 ? index - this.gridSize : undefined) //top
        allSides.push(index + this.gridSize < this.gridSize * this.gridSize ? index + this.gridSize: undefined) //bot
        allSides.push(index % this.gridSize != 0 ? index - 1 : undefined) //left
        allSides.push((index + 1) % this.gridSize != 0 ? index + 1 : undefined) //right
        allSides.push(allSides[0] !== undefined && allSides[2] !== undefined ? index - this.gridSize - 1  : undefined) //top left
        allSides.push(allSides[0] !== undefined && allSides[3] !== undefined ? index - this.gridSize + 1  : undefined) //top right
        allSides.push(allSides[1] !== undefined && allSides[2] !== undefined ? index + this.gridSize - 1  : undefined) //bot left
        allSides.push(allSides[1] !== undefined && allSides[3] !== undefined ? index + this.gridSize + 1  : undefined) //bot right
    
        // const sides = {
        //     top: allSides[0],
        //     bot: allSides[1],
        //     left: allSides[2],
        //     right: allSides[3],
        //     topLeft: allSides[4],
        //     topRight: allSides[5],
        //     botLeft: allSides[6],
        //     botRight: allSides[7]
        // }

        return allSides
    }
        
    ClearFieldsArround(field){
        const allSides = this.GetFieldsArround(field)
        allSides.forEach(fieldIndex => {
            if(fieldIndex !== undefined){
    
                const currentfield = this.fields[fieldIndex]
    
                if(!currentfield.isRevealed && !this.fieldsToAnimate.includes(currentfield.HTMLelement)){
                    this.ClearField(currentfield)
                }
            }
        })
    }

    AddFocusToField(field){
        field.HTMLelement.classList.add('focus')
        this.elementOnFocus = field.HTMLelement
    }

    RemoveFocusOfField(){
        this.elementOnFocus?.classList.remove('focus')
    }
    
    PlayFieldsAnimation(){
        let delayInMilliseconds = 0

        this.fieldsToAnimate.forEach(field => {
            this.SetAnimation(field, delayInMilliseconds, 'click')
            delayInMilliseconds += this.currentGameSetting.delayInMilliseconds
        })

        this.fieldsToAnimate = []
    }

    SetAnimation(field, delay, sound){
        setTimeout(() => {
            field.classList.add('revealed')
            field.classList.remove('flag')
            this.managers.audioManager.PlaySound(sound)
        }, delay);
    }
    
    RevealField(field){
        if(field.isRevealed) return
        if(field.hasFlag) return

        
        if(field.hasMine){
            this.LoseGame(field)
        }
        else{
            this.ClearField(field)
            this.PlayFieldsAnimation()
        }
        
        if(this.CheckWinCondition()){
            this.WinGame()
        }
    }

    FlagField(field){
        if(field.hasFlag)
        {
            field.HTMLelement.classList.remove('flag')
            field.hasFlag = false
        }
        else if(this.HaveFlagsAvailable() && !field.isRevealed)
        {
            field.HTMLelement.classList.add('flag')
            field.hasFlag = true
            this.managers.audioManager.PlaySound('click')
        }    
        this.bombDisplayer.Display(this.minesAmount - this.GetFlagsAmount())
    }

    GetFlagsAmount(){
        let flagsAmount = 0
        this.fields.forEach(field => {
            if(field.hasFlag) flagsAmount++
        })
        return flagsAmount
    }

    HaveFlagsAvailable(){
        const flagsAmount = this.GetFlagsAmount()
        if(flagsAmount > this.minesAmount) console.error('ERROR - More flags than mines!');
        return this.minesAmount > flagsAmount
    }

    CheckWinCondition(){
        let satisfiesWinCondition = true
        this.fields.forEach(field => {
            if(!field.hasMine && !field.isRevealed)
                satisfiesWinCondition = false
        })
        return satisfiesWinCondition
    }

    LoseGame(field){
        console.log('Lose');

        this.allowInput = false
        this.timer.Stop()

        this.RevealFieldsWithMines(field)
        
        setTimeout(() => {
            this.managers.audioManager.PlaySound('lose')
            menu.SetEndScreenOn('lose')
        }, 3000)
    }
    
    WinGame(){
        console.log('Win');

        this.allowInput = false
        this.timer.Stop()
        this.managers.audioManager.PlaySound('win')
        const newHighscore = this.managers.highscoreManager.SetNewHighscore(this.currentGameSetting.name ,this.timer.totalTime)

        setTimeout(() => {
            if(newHighscore)
            {
                menu.SetEndScreenOn('highscore')
            }
            else
            {
                menu.SetEndScreenOn('win')
            }
        }, 1000)
    }

    RevealFieldsWithMines(clickedField){
        let fieldsWithMine = this.fields.filter(field => field.hasMine && field != clickedField)
        fieldsWithMine.unshift(clickedField)
        this.PlayFieldsMinesAnimation(fieldsWithMine)
    }
    
    PlayFieldsMinesAnimation(fieldsWithMine){
        let delayInMilliseconds = 0

        fieldsWithMine.forEach(field => {
            this.SetAnimation(field.HTMLelement, delayInMilliseconds, 'bomb')
            delayInMilliseconds += this.currentGameSetting.explosionDelay
        })

        this.fieldsToAnimate = []
    }
}

const game = new Game()
game.managers.settingsManager.Initialize()