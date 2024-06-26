const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


let tasks = [
    { id: 1, title: 'Tarea 1', description: 'Realizar trabajo rest api', done: false },
    { id: 2, title: 'Tarea 2', description: 'realizar granpql intento 5', done: false },
    { id: 3, title: 'Tarea 3', description: 'Realizar trabajo rest api', done: false },
    { id: 4, title: 'Tarea 4', description: 'taller 26-06-2024', done: false }
];


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
});


app.post('/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    Object.assign(task, req.body);
    res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
