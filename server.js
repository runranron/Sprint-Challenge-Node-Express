const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter');

const server = express();

server.use(morgan());
server.use(bodyParser());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));