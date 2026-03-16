const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function getTasksCollection() {
    await client.connect();
    const db = client.db('maintenanceTrackerDB');
    return db.collection('tasks');
}




router.post('/tasks', async (req, res, next) => {
    try {

        if (!req.body.machineId || !req.body.machineId.trim() ||
            !req.body.taskTitle || !req.body.taskTitle.trim()) {
            return res.status(400).json({ message: 'Machine Id & Task title are required' });
        }

        const tasksCollection = await getTasksCollection();
        const newTask = {
            machineId: req.body.machineId,
            taskTitle: req.body.taskTitle,
            type: req.body.type,
            status: req.body.status,
            priority: req.body.priority,
            notes: req.body.notes
        };

        const result = await tasksCollection.insertOne(newTask);

        res.json({
            message: 'task stored',
            task: {
                _id: result.insertedId,
                ...newTask
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to store task',
            error: error.message
        });
    }

});

router.get('/tasks', async (req, res, next) => {
    try {
        const tasksCollection = await getTasksCollection();
        const tasks = await tasksCollection.find().toArray();

        res.json({
            message: "tasks loaded",
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to load tasks",
            error: error.message
        })
    }
});

router.delete(`/tasks/:id`, async (req, res, next) => {
    try {

        const taskId = req.params.id;
        const tasksCollection = await getTasksCollection();

        const result = await tasksCollection.deleteOne({
            _id: new ObjectId(taskId)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.json({
            message: 'task deleted',
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task'",
            error: error.message
        }
        )
    }

})

router.patch(`/tasks/:id`, async (req, res, next) => {
    try {

        if (!req.body.machineId || !req.body.machineId.trim() ||
            !req.body.taskTitle || !req.body.taskTitle.trim()) {
            return res.status(400).json({ message: 'Machine Id & Task title are required' });
        }

        const tasksCollection = await getTasksCollection();

        const updatedTask = {
            machineId: req.body.machineId,
            taskTitle: req.body.taskTitle,
            type: req.body.type,
            status: req.body.status,
            priority: req.body.priority,
            notes: req.body.notes
        };

        const result = await tasksCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedTask }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({
            message: 'task updated',
            task: {
                _id: req.params.id,
                ...updatedTask
            }

        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        })
    }
})

module.exports = router;

