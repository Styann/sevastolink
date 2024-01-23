const chalk = require('chalk');
const express = require('express');
const server = express();
const path = require('path');
const port = 3000;

server.use(
    express.static(path.join(__dirname, '/public'))
)

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on port ${chalk.yellow(port)}`);
    console.log(chalk.green('http://127.0.0.1:3000'))
});