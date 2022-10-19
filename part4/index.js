const app = require('./app')
const http = require('http')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})