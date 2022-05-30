const pool = require('../db');

const getAllTasks = async( req, res, next ) => {

    try {
        const result = await pool.query('select * from task');
        console.log(result.rows);
        res.send(result.rows);

    } catch (error) {
        next(error);
    }

};

const getTasksByUser = async( req, res, next ) => {

    try {
        const { email } = req.params;
        console.log(email);
        const result = await pool.query('select * from task where email = $1', [email]);
        console.log(result.rows);
        res.send(result.rows);

    } catch (error) {
        next(error);
    }

};

const getTask = async( req, res, next ) => {

    try {
        const { id } = req.params;
        const result = await pool.query('select * from task where id = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not found",
            });
        
        console.log(result.rows[0]);
        res.send(result.rows[0]);
    } catch (error) {
        next(error);
    }

};

const createTask = async( req, res, next ) => {
    const { title, description, email } = req.body;

    try {
        const result = await pool.query('insert into task (title, description, email) values ($1, $2, $3) returning *', [ 
            title, 
            description,
            email
        ]);
    
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }

};

const deleteTask = async( req, res, next ) => {

    try {
        const { id } = req.params;
        const result = await pool.query('delete from task where id = $1 returning *', [id]);
        if (result.rowCount === 0) 
            return res.status(404).json({
                message: "Task not found",
            });
        
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }

};

const updateTask = async( req, res ) => {

    try {
        const { id } = req.params;
        const { title, description, finished } = req.body;

        const result = await pool.query('update task set title = $1, description = $2, finished = $3 where id = $4 returning *', [
            title, 
            description,
            finished,
            id
        ]);

        if (result.rowCount === 0) 
            return res.status(404).json({
                message: "Task not found",
            });
        
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
    
};

module.exports = { 
    getAllTasks,
    getTasksByUser,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};