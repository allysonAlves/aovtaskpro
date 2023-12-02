const path = require('path');

class directoryPaths{
    constructor(){
        this.localDb = './server/localDb';
        this.__cookiesPath = '/cookies.txt'
        this.dataPath = `data`
        this.__taskFileName = `tasks.txt`
    }

    dataPathJoin(archiveName){        
        return path.join(this.localDb , this.dataPath, archiveName);
    }

    getCookiesPath(){
        return path.join(this.localDb, this.__cookiesPath);
    }

    getDataPath(){
        return path.join(this.localDb, this.dataPath)
    }

    getTaskPath(){
        return path.join(this.localDb, this.dataPath, this.__taskFileName)
    }    
}

module.exports = new directoryPaths();