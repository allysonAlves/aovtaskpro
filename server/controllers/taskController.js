const { syncTask } = require("../services/task.service");

class taskController{    
    inject(router){
        router.get('/task/list', async (req, res) => {
            try{ 
                const taskList = await syncTask();
                res.json([...taskList]);
            } catch(error) {
                res.status(500).json({message: error})
            }            
        });
          
       router.post('/task/create', (req, res) => {
            res.json({ message: 'Chamada para /tasks/create' });
        });
    }
}

module.exports = new taskController();