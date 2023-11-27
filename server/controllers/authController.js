const { getAuth, login } = require("../services/authService");

class authController{    
    inject(router){
        router.get('/auth', async (req, res) => {            
            const result = await getAuth();
            res.json({ ...result });          
        });
          
       router.get('/auth/login', async (req, res) => {
        const isAuth = await login();            
            res.json({ isAuth });
        });
    }
}

module.exports = new authController();