const { Router } = require('express');
const { getAllTasks, getTasksByUser, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controller');

const router = Router();

router.get('/', ( req, res ) => {
    res.send('TO-DO REST API');
})

router.get('/tasks', getAllTasks);
router.get('/tasks/:email', getTasksByUser);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.delete('/task/:id', deleteTask);
router.put('/task/:id', updateTask);

module.exports = router;