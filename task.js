const express = require('express');
const mongoose = require('mongoose');
const task = express();

//Verbindung mit dem "taskModule"
const Task = require("./taskModule");

mongoose.connect('mongodb+srv://chrissi:pass@cluster0.ymou45g.mongodb.net/Task?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

task.get('/', (req, res) => {
  res.send('Hello');
});

// Middleware-Funktion für die Anfragenprotokollierung
task.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// GET: Alle Aufgaben abrufen
task.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Beim Abrufen der Aufgaben ist ein Fehler aufgetreten.' });
  }
});

// POST: Neue Aufgabe erstellen
task.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Beim Erstellen der Aufgabe ist ein Fehler aufgetreten.' });
  }
});

task.listen(3000, () => {
    console.log('Server auf Port 3000');
});


