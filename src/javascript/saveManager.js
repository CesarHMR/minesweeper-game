class SaveManager{

    ReadData(filename){
        const file = window.api.sendSync('read-data-sync', filename)
        return JSON.parse(file)
    }

    SaveData(filename ,data){
        window.api.send('save-data', [ filename, JSON.stringify(data) ])
    }
}