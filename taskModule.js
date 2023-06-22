const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    default: "offen",
    enum: ["offen", "in Bearbeitung", "erledigt"]
  }
});

const Task = mongoose.model('Task', taskSchema, 'Task');

module.exports = Task;