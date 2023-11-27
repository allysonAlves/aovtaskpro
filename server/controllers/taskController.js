class taskController{    
    inject(router){
        router.get('/tasks/get', (req, res) => {
            res.json({ message: 'Chamada para /tasks/get' });
        });
          
       router.post('/tasks/create', (req, res) => {
            res.json({ message: 'Chamada para /tasks/create' });
        });
    }
}

module.exports = new taskController();