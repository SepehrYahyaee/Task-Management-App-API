const express = require('express');
const { userRoutes } = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

app.route('/').get((req, res, next) => {
    res.send('Welcome to the Task Management App!');
})

app.listen(process.env.PORT, () => { console.log('server is running on port: ', process.env.PORT) });