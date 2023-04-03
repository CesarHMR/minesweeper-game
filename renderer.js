document.querySelector('#close').addEventListener('click', () => {
    window.api.send("close");
})

document.querySelector('#minimize').addEventListener('click', () => {
    window.api.send('minimize')
})