const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  allowedHeaders: ['Content-Type'],
  credentials: true
})

module.exports = corsMiddleware