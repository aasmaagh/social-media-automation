const IORedis = require('ioredis')

const redisConection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null,
})

module.exports = redisConection