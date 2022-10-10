const express = require('express')

const imageRoutes = require('./routes/images')

const server = express()

// Middleware
server.use(express.json())

// Routes
server.use('/api/v1/images', imageRoutes)

module.exports = server
