const { Router } = require('express');
const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controller');

const router = Router();

router.get('/', ( req, res ) => {
    res.send('Hello world');
})

router.get('/tasks', getAllTasks);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.delete('/task/:id', deleteTask);
router.put('/task/:id', updateTask);

module.exports = router;