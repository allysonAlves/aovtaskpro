const fs = require('fs');
const directoryPaths = require('../utils/directory.utils');

const getTaskList = () => {    
    let tasksData = '[]';

    if (fs.existsSync(directoryPaths.getTaskPath()))        
        tasksData = fs.readFileSync(directoryPaths.taskPath, 'utf-8');       

    return JSON.parse(tasksData);
}

const saveTaskList = (taskList) => {    
    if (!fs.existsSync(directoryPaths.getDataPath())) 
            fs.mkdirSync(directoryPaths.getDataPath());

    fs.writeFileSync(directoryPaths.getTaskPath(), JSON.stringify(taskList), 'utf-8');   
}

module.exports = {getTaskList, saveTaskList}