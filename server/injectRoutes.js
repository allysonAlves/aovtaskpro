const express = require('express');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const router = express.Router();

router.get('/status', (req, res) => {
  res.send('no ar!');
});

taskController.inject(router);
authController.inject(router);

module.exports = router;