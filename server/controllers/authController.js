const { getAuth, login } = require("../services/authService");

class authController{    
    inject(router){
        router.get('/auth', async (req, res) => {            
            const result = await getAuth();
            res.json({ ...result });          
        });
          
       router.get('/auth/login', async (req, res) => {
        const result = await login();            
            res.json({ ...result });
        });
    }
}

module.exports = new authController();