const express = require('express');
const verifyToken = require('../util/authMiddleware');

const taskController = require('../controllers/task');

const router = express.Router();

router.get('/:id', verifyToken, taskController.getAllTasks);

router.get('/one/:id', verifyToken, taskController.getOneTasks);

router.post('/',verifyToken, taskController.postTask);

router.put('/',verifyToken, taskController.putTask);

router.delete('/:id',verifyToken, taskController.deleteTask);

router.get('/countTask',verifyToken, taskController.countTask);

module.exports = router;
