const root = document.querySelector(':root')
const menu = document.querySelector('#menu')

function EasyButton(){
    console.log('easy')
    game.SetNewGame('easy')
    SetMenuOff()
}

function MediumButton(){
    console.log('medium')
    game.SetNewGame('medium')
    SetMenuOff()
}

function HardButton(){
    console.log('hard')
    game.SetNewGame('hard')
    SetMenuOff()
}

function SetMenuOff(){
    menu.style.display = 'none'
}