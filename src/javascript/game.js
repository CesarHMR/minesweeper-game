class Game {
    gameGridReference
    
    fields = []

    gridSize = 0
    minesAmount = 0

    fieldsToAnimate = []

    elementOnFocus

    difficultyModes = {
        easy: {
            gridSize: 5,
            minesAmount: 4,
        },
        medium: {
            gridSize: 8,
            minesAmount: 10
        },
        hard:{
            gridSize: 10,
            minesAmount: 25
        }
    }

    constructor(){
        this.gameGridReference = document.querySelector('#game-grid')
    }

    SetNewGame(difficulytMode) {
        this.fields = []
        this.gameGridReference.innerHTML = ''
        this.gridSize = this.difficultyModes[difficulytMode].gridSize
        this.minesAmount = this.difficultyModes[difficulytMode].minesAmount
        root.style.setProperty('--gridSize', this.gridSize);
    
        for (let index = 0; index < this.gridSize * this.gridSize; index++) {
            this.fields.push({
                HTMLelement: {},
                hasMine: this.minesAmount > index ? true : false,
                hasFlag: false,
                isRevealed: false
            })
        }

        this.fields = this.fields.sort(() => Math.random() - 0.5)

        this.fields.forEach((field, index) => {
            this.CreateFieldElement(field)
        })

        window.onmouseup = () => {//also add on mouse leave!!!
            this.elementOnFocus?.classList.remove('focus')
        }

        //Display the game
    }

    CreateFieldElement(field){
        field.HTMLelement = document.createElement('button')
        field.HTMLelement.classList.add('field')
        if(field.hasMine){
            field.HTMLelement.classList.add('mine')
        }
    
        field.HTMLelement.onclick = () => this.RevealField(field)
        field.HTMLelement.oncontextmenu = () => this.FlagField(field)
    
        field.HTMLelement.onmousedown = () => {
            field.HTMLelement.classList.add('focus')
            this.elementOnFocus = field.HTMLelement
        }

        this.gameGridReference.appendChild(field.HTMLelement)
    }
    
    LoseGame(){
        PlaySound('lose')
    }
    
    WinGame(){
        PlaySound('win')
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
        
    ClearField(field){
        field.isRevealed= true
        const minesArround = this.CountMinesArround(field)
        
        if(!field.hasMine){
            field.HTMLelement.innerText = minesArround !== 0 ? minesArround: ''
        }
    
        this.fieldsToAnimate.push(field.HTMLelement)
        
        if(minesArround === 0 && !field.hasMine){   
            this.ClearFieldsArround(field)
        }
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
    
    PlayFieldsAnimation(){
        let timeToWait = 0
        this.fieldsToAnimate.forEach(field => {
            setTimeout(() => {
                field.classList.add('revealed')
                PlaySound('click')
            }, timeToWait);
            timeToWait += 200
        })
        this.fieldsToAnimate = []
    }
    
    CheckWinCondition(){
        let satisfiesWinCondition = true
        this.fields.forEach(field => {
            if(!field.hasMine && !field.isRevealed)
                satisfiesWinCondition = false
        })
        return satisfiesWinCondition
    }

    RevealField(field){
        if(field.isRevealed) return
        if(field.hasFlag) return

        this.ClearField(field)
        this.PlayFieldsAnimation(this.fieldsToAnimate)
        
        if(field.hasMine){
            this.LoseGame()
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
        }    
    }

    HaveFlagsAvailable(){
        let flagsAmount = 0
        this.fields.forEach(field => {
            if(field.hasFlag) flagsAmount++
        })

        if(flagsAmount > this.minesAmount) console.error('ERROR - More flags than mines!');

        return this.minesAmount > flagsAmount
    }
}

const game = new Game()