const express = require("express");
const accountsRouter = require("./accounts/accounts-router")
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message)
})

module.exports = server;
