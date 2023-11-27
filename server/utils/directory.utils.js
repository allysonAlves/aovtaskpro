const path = require('path');

class directoryPaths{
    constructor(){
        this.localDb = './server/localDb';
        this.__cookiesPath = 'cookies.txt'
    }
    storePathJoin(archiveName){        
        return path.join(this.localDb, archiveName);
    }
    getCookiesPath(){
        return path.join(this.localDb, this.__cookiesPath);
    }
}

module.exports = new directoryPaths();