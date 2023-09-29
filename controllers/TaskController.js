const TaskModel = require('../models/TaskModel')

module.exports.getTask = async ( req, res) => {
    const task = await TaskModel.find()
    res.send(task)
}

//Saving task to the database//
module.exports.saveTask = async ( req, res) => {
    const { text } = req.body

    TaskModel.create({text})
             .then((data) => {
              console.log("Added successfully")
              console.log(data);
              res.send(data)
    }) .catch((error) => {
        console.error("Error adding task:", error);
        res.status(500).json({ error: 'Server error' });
    });
    
}

module.exports.updateTask = async (req, res) => {
    const { _id, text } = req.body;
  
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(_id, { text }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

module.exports.deleteTask = async (req, res) => {
    const { _id } = req.body;
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(_id);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };