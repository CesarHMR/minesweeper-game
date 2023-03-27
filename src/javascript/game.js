// class Game {
//     field = []
//     mines = []
//     fieldsToClean = 0
//     flagsToUse = 0
//     elementOnFocus
//     fieldsToAnimate = []

//     constructor(){
//         this.gameGrid = document.querySelector('#game-grid')
//     }
// }

const gameGrid = document.querySelector('#game-grid')
let fields = []
let mines = []
let fieldsToClean = 0
let flagsToUse = 0
let elementOnFocus
let fieldsToAnimate = []

const gameDifficulties = {
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

function SetNewGame(gridSize, minesAmount){
    fieldsToClean = (gridSize * gridSize) - minesAmount
    flagsToUse = minesAmount

    for (let index = 0; index < gridSize * gridSize; index++) {
        fields.push(CreateField(index, gridSize))
        mines.push(minesAmount > index ? true : false)
    }

    mines = mines.sort(() => Math.random() - 0.5)

    fields.forEach((field, index) => {
        gameGrid.appendChild(field)

        if(mines[index]){
            field.classList.add('mine')
        }
    })
}

function CreateField(index, gridSize){
    const field = document.createElement('button')
    field.classList.add('field')
    field.id = index

    field.onclick = () => {

        if(field.classList.contains('flag')) return
        if(field.classList.contains('revealed')) return

        ClearField(field, index, gridSize)
        PlayFieldsAnimation(fieldsToAnimate)
        
        if(field.classList.contains('mine')){
            LoseGame()
        }

        if(fieldsToClean <= 0){
            WinGame()
        }        
    }

    field.oncontextmenu = () => {

        if(field.classList.contains('flag'))
        {
            field.classList.remove('flag')
            flagsToUse++
        }
        else
        {
            if(flagsToUse <= 0) return
            field.classList.add('flag')
            flagsToUse--
        }    
    }

    field.onmousedown = () => {
        field.classList.add('focus')
        elementOnFocus = field
    }

    return field
}

function LoseGame(){
    PlaySound('lose')
}

function WinGame(){
    PlaySound('win')
}

function ResetGame(){
    gameGrid.innerHTML = ''
    fields = []
    mines = []
    fieldsToClean = 0
    flagsToUse = 0
}

function CountMinesArround(index, gridSize){
    allSides = GetFieldsArroun(index, gridSize)

    minesCount = allSides.filter(side => {
        return side !== undefined ? fields[side].classList.contains('mine') : false
    })
    
    console.log('index - ' + index)
    console.log('minescount - ' + minesCount)

    const sides = {
        top: allSides[0],
        bot: allSides[1],
        left: allSides[2],
        right: allSides[3],
        topLeft: allSides[4],
        topRight: allSides[5],
        botLeft: allSides[6],
        botRight: allSides[7]
    }
    console.log(sides)
    console.log('-------------')

    return minesCount.length
}

function GetFieldsArroun(index, gridSize){
    allSides = []
    
    allSides.push(index - gridSize >= 0 ? index - gridSize : undefined) //top
    allSides.push(index + gridSize < gridSize * gridSize ? index + gridSize: undefined) //bot
    allSides.push(index % gridSize != 0 ? index - 1 : undefined) //left
    allSides.push((index + 1) % gridSize != 0 ? index + 1 : undefined) //right
    allSides.push(allSides[0] !== undefined && allSides[2] !== undefined ? index - gridSize - 1  : undefined) //top left
    allSides.push(allSides[0] !== undefined && allSides[3] !== undefined ? index - gridSize + 1  : undefined) //top right
    allSides.push(allSides[1] !== undefined && allSides[2] !== undefined ? index + gridSize - 1  : undefined) //bot left
    allSides.push(allSides[1] !== undefined && allSides[3] !== undefined ? index + gridSize + 1  : undefined) //bot right

    return allSides
}

function ClearFieldsArround(index, gridSize){
    allSides = GetFieldsArroun(index, gridSize)
    allSides.forEach(fieldIndex => {
        if(fieldIndex !== undefined){

            const field = document.getElementById(fieldIndex)

            if(field.classList.contains('revealed') == false && !fieldsToAnimate.includes(field)){
                ClearField(field, fieldIndex, gridSize)
            }
        }
    })
}

function ClearField(field, index, gridSize){
    const minesArround = CountMinesArround(index, gridSize)
    if(!field.classList.contains('mine')){
        field.innerText = minesArround === 0 ? '' : minesArround
        fieldsToClean--
    }

    fieldsToAnimate.push(field)
    
    if(minesArround === 0 && !field.classList.contains('mine')){   
        ClearFieldsArround(index, gridSize)
    }
}

function PlayFieldsAnimation(){
    let timeToWait = 0
    fieldsToAnimate.forEach(field => {
        setTimeout(() => {
            field.classList.add('revealed')
            PlaySound('click')
        }, timeToWait);
        timeToWait += 200
    })
    fieldsToAnimate = []
}

window.addEventListener('mouseup', () => {
    elementOnFocus?.classList.remove('focus')
})