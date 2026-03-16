
require('dotenv').config();
const express = require("express");

const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(tasksRoutes)



app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});

