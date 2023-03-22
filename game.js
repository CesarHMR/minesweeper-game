const gameGrid = document.querySelector('#game-grid')
let fields = []
let mines = []
let fieldsToClean = 0

function SetGameGrid(gridSize, minesAmount){
    fieldsToClean = (gridSize * gridSize) - minesAmount

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
    const field = document.createElement('input')
    field.type = 'button'
    field.classList.add('field')
    field.id = index

    field.onclick = () => {
        if(field.classList.contains('flag')) return
        if(field.classList.contains('revealed')) return

        field.classList.add('revealed')
        if(field.classList.contains('mine'))
        {
            EndGame()
        }
        else
        {
            field.value = SetFieldNumber(index, gridSize)
            fieldsToClean--
            if(fieldsToClean <= 0)
                WinGame()
        }
    }

    field.onauxclick = () => {
        if(field.classList.contains('flag'))
        {
            field.classList.remove('flag')
        }
        else
        {
            field.classList.add('flag')
        }
    }

    return field
}

function EndGame(key){
    alert('END GAME')
}

function WinGame(){
    alert('WIN GAME')
}

function ResetGame(){
    gameGrid.innerHTML = ''
    fields = []
    mines = []
}

function SetFieldNumber(index, gridSize){
    allSides = []
    
    allSides.push(index - gridSize >= 0 ? index - gridSize : undefined) //top
    allSides.push(index + gridSize < gridSize * gridSize ? index + gridSize: undefined) //bot
    allSides.push(index % gridSize != 0 ? index - 1 : undefined) //left
    allSides.push((index + 1) % gridSize != 0 ? index + 1 : undefined) //right
    allSides.push(allSides[0] && allSides[2] ? index - gridSize - 1  : undefined) //top left
    allSides.push(allSides[0] && allSides[3] ? index - gridSize + 1  : undefined) //top right
    allSides.push(allSides[1] && allSides[2] ? index + gridSize - 1  : undefined) //bot left
    allSides.push(allSides[1] && allSides[3] ? index + gridSize + 1  : undefined) //bot right
    
    minesCount = allSides.filter(side => {
        return side !== undefined ? fields[side].classList.contains('mine') : false
    })
    
    console.log(minesCount)
    console.log(minesCount.length)
    return minesCount.length
}