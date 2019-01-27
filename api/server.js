require('dotenv').config()
require('module-alias/register')

const http = require('http'),
      API = require('@MyAppAPI'),
      API_SERVER = http.Server(API),
      API_PORT = process.env.PORT || 3001
      LOCAL = '0.0.0.0'

API_SERVER.listen(API_PORT, LOCAL, () => console.log(`API running on ${API_PORT}`))
