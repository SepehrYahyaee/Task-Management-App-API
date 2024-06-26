const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const { userRoutes, taskRoutes, tagRoutes } = require('./routes');
const { errorHandler } = require('./middlewares');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/tag', tagRoutes);
app.use(logger('combined', { stream: fs.createWriteStream(path.join(__dirname, 'logFile.log'), { flags: 'a' }) }));
app.use(errorHandler.globalErrorHandler);

app.route('/').get((req, res, next) => {
    return res.send('Welcome to the Task Management App!');
})

app.all('*', (req, res) => {res.send('404 - NOT FOUND')});

app.listen(process.env.PORT, () => { console.log('server is running on port: ', process.env.PORT) });