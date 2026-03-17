
require('dotenv').config();
const express = require("express");
const { MongoClient } = require('mongodb');
const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('maintenanceTrackerDB');
        app.locals.tasksCollection = db.collection('tasks');

        app.use(tasksRoutes);

        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            console.log(`Server running on port ${process.env.PORT || 3001}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});

startServer();