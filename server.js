const express = require('express')

const imageRoutes = require('./routes/users')

const server = express()

// Middleware
server.use(express.json())

// Routes
server.use('/api/v1/image', imageRoutes)

module.exports = server
