const express = require('express');
const { userRoutes, taskRoutes, tagRoutes } = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/tag', tagRoutes);

app.route('/').get((req, res, next) => {
    return res.send('Welcome to the Task Management App!');
})

app.listen(process.env.PORT, () => { console.log('server is running on port: ', process.env.PORT) });