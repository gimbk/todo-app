const express = require('express');
const verifyToken = require('../util/authMiddleware');

const taskController = require('../controllers/task');

const router = express.Router();

router.get('/:id', verifyToken, taskController.getAllTasks);

router.get('/all', verifyToken, taskController.getAllTasks);

router.get('/one/:id', verifyToken, taskController.getOneTasks);

router.post('/add',verifyToken, taskController.postTask);

router.put('/update',verifyToken, taskController.putTask);

router.delete('/:id',verifyToken, taskController.deleteTask);

router.get('/countTask',verifyToken, taskController.countTask);

module.exports = router;
