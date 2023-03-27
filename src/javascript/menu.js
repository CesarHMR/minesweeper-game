const root = document.querySelector(':root')
const menu = document.querySelector('#menu')

function EasyButton(){
    console.log('easy')
    SetNewGame(5, 4) // (4 / 25 => 16%)
    SetMenuOff()
    root.style.setProperty('--gridSize', 5);
}

function MediumButton(){
    console.log('medium')
    SetNewGame(7, 10) // (4 / 25 => 20%)
    SetMenuOff()
    root.style.setProperty('--gridSize', 7);
}

function HardButton(){
    console.log('hard')
    SetNewGame(8, 10) // (4 / 25 => 16%)
    SetMenuOff()
    root.style.setProperty('--gridSize', 8);
}

function SetMenuOff(){
    menu.style.display = 'none'
}